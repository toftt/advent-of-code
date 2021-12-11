import { lineify, parseInts, Position, readInput, SparseGrid } from "~utils";

const adj = (s: number[][], coords: [number, number]) => {
  const [x, y] = coords;

  return [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
    [x - 1, y - 1],
    [x + 1, y - 1],
    [x - 1, y + 1],
    [x + 1, y + 1],
  ]
    .filter(([xx, yy]) => {
      return s[xx]?.[yy] !== undefined;
    })
    .map(([xxx, yy]) => {
      return [xxx, yy];
    });
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid = SparseGrid.fromString(input);

  let sum = 0;
  for (let step = 0; step < 100; step++) {
    grid.updateAll((x) => x + 1);

    const flashedSet = new Set<string>();
    const hasFlashed = (p: Position) =>
      flashedSet.has(SparseGrid.positionToString(p));
    const setFlashed = (p: Position) =>
      flashedSet.add(SparseGrid.positionToString(p));

    let prevLength = 0;
    while (true) {
      for (const pos of grid.keys()) {
        if (hasFlashed(pos)) continue;

        const value = grid.get(pos)!;

        if (value > 9) {
          setFlashed(pos);
          grid
            .adjecent(pos, { includeDiagonals: true, bounded: true })
            .forEach((adjPos) => {
              grid.set(adjPos, grid.get(adjPos)! + 1);
            });
        }
      }

      if (flashedSet.size === prevLength) break;
      prevLength = flashedSet.size;
    }

    for (const pos of grid.keys()) {
      if (hasFlashed(pos)) {
        grid.set(pos, 0);
      }
    }

    sum += flashedSet.size;
  }

  return sum;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid = SparseGrid.fromString(input);

  for (let step = 0; step < Infinity; step++) {
    grid.updateAll((x) => x + 1);

    const flashedSet = new Set<string>();
    const hasFlashed = (p: Position) =>
      flashedSet.has(SparseGrid.positionToString(p));
    const setFlashed = (p: Position) =>
      flashedSet.add(SparseGrid.positionToString(p));

    let prevLength = 0;
    while (true) {
      for (const pos of grid.keys()) {
        if (hasFlashed(pos)) continue;

        const value = grid.get(pos)!;

        if (value > 9) {
          setFlashed(pos);
          grid
            .adjecent(pos, { includeDiagonals: true, bounded: true })
            .forEach((adjPos) => {
              grid.set(adjPos, grid.get(adjPos)! + 1);
            });
        }
      }

      if (flashedSet.size === prevLength) break;
      prevLength = flashedSet.size;
    }

    for (const pos of grid.keys()) {
      if (hasFlashed(pos)) {
        grid.set(pos, 0);
      }
    }
    if (flashedSet.size === 100) {
      return step + 1;
    }
  }

  return -1;
};
