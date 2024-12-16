import {
  CARDINAL_DIRECTIONS,
  Direction,
  move,
  Position,
  readInput,
  SparseGrid,
  StringifiedSet,
} from "~utils";

const hash = (a: any) => {
  return JSON.stringify({ p: a.pos, d: a.dir });
};

const mod = (a: number, n: number) => {
  return ((a % n) + n) % n;
};

const rotate = (dir: Direction, clockwise: boolean = true) => {
  const idx = CARDINAL_DIRECTIONS.findIndex((x) => x === dir)!;
  const newIdx = clockwise
    ? mod(idx + 1, CARDINAL_DIRECTIONS.length)
    : mod(idx - 1, CARDINAL_DIRECTIONS.length);

  return CARDINAL_DIRECTIONS[newIdx];
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid = SparseGrid.fromString2(input);

  const start = grid.entries().filter(([a, b]) => b === "S")[0][0];
  const end = grid.entries().filter(([a, b]) => b === "E")[0][0];

  const visited = new Map<string, number>();
  const toVisit = [{ pos: start, dir: Direction.E, value: 0 }];

  while (toVisit.length > 0) {
    const current = toVisit.pop()!;
    const h = hash(current);
    if (visited.has(h)) {
      if (visited.get(h)! < current.value) continue;
    }
    visited.set(h, current.value);

    for (const d of [rotate(current.dir, false), rotate(current.dir, true)]) {
      toVisit.push({ pos: current.pos, dir: d, value: current.value + 1000 });
    }

    const n = move(current.pos, current.dir);
    if (grid.get(n) !== "#") {
      toVisit.push({ pos: n, dir: current.dir, value: current.value + 1 });
    }
  }

  const finishes = [...visited.entries()]
    .map(([a, b]) => ({
      o: JSON.parse(a),
      v: b,
    }))
    .filter(({ o, v }) => o.p.x === end.x && o.p.y === end.y)
    .map(({ o, v }) => v);
  return Math.min(...finishes);
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  // solution here
  return 0;
};
