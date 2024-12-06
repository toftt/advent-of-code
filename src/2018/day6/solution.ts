import {
  getBoundsFromPositions,
  intify,
  lineify,
  manhattanDistance,
  readInput,
  SparseGrid,
  namedTwine,
  enumerate,
  Direction,
  Counter,
  sum,
} from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);
  const positions = [...enumerate(lines)].map(([s, i]) => {
    const [x, y] = intify(s);
    return { name: i, pos: { x, y } };
  });

  const grid = new SparseGrid<string>();
  const bounds = getBoundsFromPositions(positions.map((x) => x.pos));

  for (let x = bounds.x.min; x <= bounds.x.max; x++) {
    for (let y = bounds.y.min; y <= bounds.y.max; y++) {
      const pos = { x, y };
      const withDistance = namedTwine(positions, "pos", "dist", (p) =>
        manhattanDistance(p.pos, pos),
      );
      const minDist = Math.min(...withDistance.map((x) => x.dist));
      const eligiblePositions = withDistance.filter((x) => x.dist === minDist);
      if (eligiblePositions.length === 1) {
        grid.set(pos, `${eligiblePositions[0].pos.name}`);
      }
    }
  }

  const pointsOnBounds = grid
    .traverseDirection(
      { x: grid.bounds.x.min, y: grid.bounds.y.min },
      Direction.S,
      { continueOverGaps: true },
    )
    .concat(
      grid.traverseDirection(
        { x: grid.bounds.x.min, y: grid.bounds.y.min },
        Direction.E,
        { continueOverGaps: true },
      ),
    )
    .concat(
      grid.traverseDirection(
        { x: grid.bounds.x.max, y: grid.bounds.y.max },
        Direction.N,
        { continueOverGaps: true },
      ),
    )
    .concat(
      grid.traverseDirection(
        { x: grid.bounds.x.max, y: grid.bounds.y.max },
        Direction.W,
        { continueOverGaps: true },
      ),
    )
    .map((p) => p.value);

  const uniqueBoundsPoints = new Set(pointsOnBounds);

  const allPoints = grid.values().filter((x) => !uniqueBoundsPoints.has(x));
  const counter = new Counter(allPoints);

  return counter.mostCommon()[1];
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);
  const positions = [...enumerate(lines)].map(([s, i]) => {
    const [x, y] = intify(s);
    return { name: i, pos: { x, y } };
  });

  const grid = new SparseGrid<string>();
  const bounds = getBoundsFromPositions(positions.map((x) => x.pos));

  let c = 0;
  for (let x = bounds.x.min - 1_050; x <= bounds.x.max + 1_050; x++) {
    for (let y = bounds.y.min - 1_050; y <= bounds.y.max + 1_050; y++) {
      const pos = { x, y };
      const totalDistance = sum(
        positions.map((p) => manhattanDistance(p.pos, pos)),
      );

      if (totalDistance < 10_000) c++;
    }
  }

  return c;
};
