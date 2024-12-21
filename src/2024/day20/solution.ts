import {
  CARDINAL_DIRECTIONS,
  Counter,
  HashMap,
  HashSet,
  intify,
  lineify,
  makeHash,
  manhattanDistance,
  move,
  Position,
  PriorityQueue,
  readInput,
  SparseGrid,
  SparseGridV2,
  StringifiedSet,
} from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid = SparseGrid.fromString2(input);

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
    .filter(([a, b]) => b !== "#")
    .map(([a, b]) => a);

  possibleVisits.forEach((p) => {
    if (grid.get(p) === "S") {
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
  }

  let cheats: number[] = [];
  for (const [p, v] of grid.entries()) {
    if (v === "#") continue;

    for (const d of CARDINAL_DIRECTIONS) {
      if (grid.get(move(p, d, 1)) !== "#") continue;
      const newPos = move(p, d, 2);
      const nDist = dist.get(SparseGrid.positionToString(newPos))! + 2;
      const oDist = dist.get(SparseGrid.positionToString(p))!;

      if (nDist < oDist) {
        cheats.push(oDist - nDist);
      }
    }
  }
  const c = new Counter();
  cheats.forEach((x) => {
    c.add(x);
  });

  console.log(c);

  console.log(cheats);
  return cheats.filter((x) => x >= 100).length;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid = SparseGridV2.fromString2(input);

  const dist = new HashMap<Position, number>(
    (p) => p.x * 1000 + p.y,
    (a, b) => a.x === b.x && a.y === b.y,
  );
  const visited = new HashSet<Position>(
    (p) => p.x * 1000 + p.y,
    (a, b) => a.x === b.x && a.y === b.y,
  );
  const unvisited = new PriorityQueue<Position>(
    [],
    (a, b) => dist.get(a)! < dist.get(b)!,
  );

  const possibleVisits = [...grid.entries()]
    .filter(([a, b]) => b !== "#")
    .map(([a, b]) => a);

  possibleVisits.forEach((p) => {
    if (grid.get(p) === "S") {
      dist.set(p, 0);
    } else {
      dist.set(p, Infinity);
    }
    unvisited.push(p);
  });

  while (!unvisited.isEmpty()) {
    const current = unvisited.pop();

    for (const node of grid
      .adjecent(current)
      .filter((x) => grid.get(x) !== "#" && !visited.has(x))) {
      const d1 = dist.get(current)!;
      const d2 = dist.get(node)!;

      dist.set(node, Math.min(d1 + 1, d2));
      unvisited.increasePriority((e) => e.x === node.x && e.y === node.y, node);
    }

    visited.add(current);
  }

  let cheats = 0;
  let count = 0;
  for (const [p, v] of grid.entries()) {
    if (v === "#") continue;
    if (count++ % 10 === 0) console.log(count);

    for (const [endP, endV] of grid.entries()) {
      if (endV === "#") continue;
      const cheatDistance = manhattanDistance(p, endP);
      if (cheatDistance > 20) continue;
      const nDist = dist.get(endP)! + cheatDistance;
      const oDist = dist.get(p)!;
      if (nDist < oDist && oDist - nDist >= 100) {
        cheats++;
      }
    }
  }
  // const c = new Counter();
  // cheats.forEach((x) => {
  //   c.add(x);
  // });

  // console.log(c);

  return cheats;
};
