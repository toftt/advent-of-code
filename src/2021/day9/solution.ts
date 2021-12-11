import {
  mult,
  Position,
  readInput,
  SparseGrid,
  StringifiedSet,
  sum,
} from "~utils";

const getLowPoints = (grid: SparseGrid<number>) => {
  const lowPoints: [Position, number][] = [];
  grid.entries().forEach(([k, v]) => {
    if (grid.adjecent(k).every((adjPos) => grid.get(adjPos)! > v)) {
      lowPoints.push([k, v]);
    }
  });
  return lowPoints;
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid = SparseGrid.fromString(input);

  return sum(getLowPoints(grid).map(([_k, v]) => v + 1));
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid = SparseGrid.fromString(input);

  const lowPoints = getLowPoints(grid).map(([pos]) => pos);
  const basinSizes: number[] = [];

  const seen = new StringifiedSet();
  for (const lowPoint of lowPoints) {
    let basinSize = 0;
    const queue = [lowPoint];

    while (queue.length !== 0) {
      const pos = queue.pop()!;
      const value = grid.get(pos!)!;

      if (seen.has(pos) || value >= 9) continue;

      seen.add(pos);
      basinSize++;

      queue.push(...grid.adjecent(pos, { bounded: true }));
    }
    basinSizes.push(basinSize);
  }

  basinSizes.sort((a, b) => b - a);

  return basinSizes.slice(0, 3).reduce(mult, 1);
};
