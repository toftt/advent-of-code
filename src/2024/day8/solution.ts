import {
  allPositionsFromBounds,
  combinations,
  groupBy,
  manhattanDistance,
  mapValues,
  Position,
  readInput,
  SparseGrid,
  StringifiedSet,
} from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid = SparseGrid.fromString2(input);

  const antennas = [...grid.entries()].filter(([_pos, val]) => val !== ".");
  const antennasByName = groupBy(antennas, (x) => x[1]);
  const antPositionsByName = mapValues(antennasByName, (l) =>
    l.map((a) => a[0]),
  );

  const ss = new StringifiedSet<Position>();
  for (const position of allPositionsFromBounds(grid.bounds)) {
    for (const points of Object.values(antPositionsByName)) {
      for (const [p1, p2] of combinations(points, 2)) {
        const d1 = manhattanDistance(position, p1);
        const d2 = manhattanDistance(position, p2);

        if (
          (position.x === p1.x && position.y === p1.y) ||
          (position.x === p2.x && position.y === p2.y)
        ) {
          continue;
        }

        const a1 = (position.x - p1.x) / (position.y - p1.y);
        const b1 = (position.x - p2.x) / (position.y - p2.y);

        if (Math.max(d1, d2) === Math.min(d1, d2) * 2 && a1 === b1) {
          ss.add(position);
        }
      }
    }
  }
  return ss.keys().length;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid = SparseGrid.fromString2(input);

  const antennas = [...grid.entries()].filter(([_pos, val]) => val !== ".");
  const antennasByName = groupBy(antennas, (x) => x[1]);
  const antPositionsByName = mapValues(antennasByName, (l) =>
    l.map((a) => a[0]),
  );

  const ss = new StringifiedSet<Position>();
  for (const position of allPositionsFromBounds(grid.bounds)) {
    for (const points of Object.values(antPositionsByName)) {
      for (const [p1, p2] of combinations(points, 2)) {
        if (
          (position.x === p1.x && position.y === p1.y) ||
          (position.x === p2.x && position.y === p2.y)
        ) {
          continue;
        }

        const a1 = (position.x - p1.x) / (position.y - p1.y);
        const b1 = (position.x - p2.x) / (position.y - p2.y);

        if (a1 === b1) {
          ss.add(position);
        }
      }
    }
  }

  for (const points of Object.values(antPositionsByName)) {
    for (const [p1, p2] of combinations(points, 2)) {
      ss.add(p1);
      ss.add(p2);
    }
  }

  return ss.keys().length;
};
