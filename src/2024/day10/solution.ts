import {
  allPositionsFromBounds,
  first,
  last,
  Position,
  readInput,
  SparseGrid,
  StringifiedSet,
  sum,
} from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid = SparseGrid.fromString2(input);

  let result = 0;
  for (const pos of grid
    .entries()
    .filter(([_, h]) => parseInt(h) === 0)
    .map(([p, _]) => p)) {
    let n = 0;
    let reachable = new StringifiedSet<Position>();
    let seen = new StringifiedSet<Position>();

    reachable.add(pos);
    while (reachable.size !== 0) {
      const cur = reachable.keys()[0];
      const h = parseInt(grid.get(cur)!);

      if (h === 9) {
        n++;
      }
      seen.add(cur);
      reachable.delete(cur);

      const next = grid
        .adjecent(cur, { bounded: true })
        .filter((adj) => parseInt(grid.get(adj)!) === h + 1)
        .filter((adj) => !seen.has(adj));

      next.forEach((x) => {
        reachable.add(x);
      });
    }
    result += n;
  }

  // solution here
  return result;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid = SparseGrid.fromString2(input);

  let m: Map<string, number> = new Map();
  for (const pos of grid
    .entries()
    .filter(([_, h]) => parseInt(h) === 0)
    .map(([p, _]) => p)) {
    let n = 0;
    let reachable: Position[][] = [];

    reachable.push([pos]);
    while (reachable.length !== 0) {
      const curTrail = reachable.pop()!;
      const cur = last(curTrail);
      const h = parseInt(grid.get(cur)!);

      if (grid.get(cur)! === "9") {
        const start = SparseGrid.positionToString(first(curTrail));
        m.set(start, (m.get(start) || 0) + 1);
      }

      const next = grid
        .adjecent(cur, { bounded: true })
        .filter((adj) => parseInt(grid.get(adj)!) === h + 1);

      next.forEach((x) => {
        const newT = [...curTrail, x];
        reachable.push(newT);
      });
    }
  }

  return sum(m.values());
};
