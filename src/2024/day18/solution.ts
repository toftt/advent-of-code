import {
  intify,
  lineify,
  Position,
  PriorityQueue,
  readInput,
  SparseGrid,
  StringifiedSet,
} from "~utils";
import { HashSet } from "~utils/hash";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const positions = lineify(input)
    .map((x) => intify(x))
    .map(([x, y]) => ({ x, y }));
  const grid = new SparseGrid<string>();

  for (let i = 0; i <= (useTestData ? 6 : 70); i++) {
    for (let j = 0; j <= (useTestData ? 6 : 70); j++) {
      grid.set({ x: i, y: j }, ".");
    }
  }
  positions.slice(0, useTestData ? 12 : 3036).forEach((pos) => {
    grid.set(pos, "#");
  });

  const dist = new Map<string, number>();
  const visited = new StringifiedSet<Position>();
  const unvisited = new PriorityQueue<Position>(
    [],
    (a, b) =>
      dist.get(SparseGrid.positionToString(a))! <
      dist.get(SparseGrid.positionToString(b))!,
  );

  const possibleVisits = grid
    .entries()
    .filter(([a, b]) => b === ".")
    .map(([a, b]) => a);

  possibleVisits.forEach((p) => {
    if (p.x === 0 && p.y === 0) {
      dist.set(SparseGrid.positionToString(p), 0);
    } else {
      dist.set(SparseGrid.positionToString(p), Infinity);
    }
    unvisited.push(p);
  });

  while (!unvisited.isEmpty()) {
    const current = unvisited.pop();

    for (const node of grid
      .adjecent(current)
      .filter((x) => grid.get(x) !== "#" && !visited.has(x))) {
      const d1 = dist.get(SparseGrid.positionToString(current))!;
      const d2 = dist.get(SparseGrid.positionToString(node))!;

      dist.set(SparseGrid.positionToString(node), Math.min(d1 + 1, d2));
      unvisited.increasePriority((e) => e.x === node.x && e.y === node.y, node);
    }

    visited.add(current);
    if (current.x === 70 && current.y === 70) break;
  }

  return dist.get(SparseGrid.positionToString({ x: 70, y: 70 }))!;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  // solution here
  return 0;
};
