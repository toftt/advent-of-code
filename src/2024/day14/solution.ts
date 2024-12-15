import {
  Counter,
  intify,
  lineify,
  move,
  move2,
  Position,
  product,
  readInput,
  SparseGrid,
  sum,
} from "~utils";

const mod = (a: number, n: number) => {
  return ((a % n) + n) % n;
};

export const part1 = (useTestData: boolean = false): number => {
  const width = useTestData ? 11 : 101;
  const height = useTestData ? 7 : 103;

  const input = readInput(useTestData);
  const x = lineify(input)
    .map((x) => intify(x))
    .map(([x, y, px, py]) => {
      return {
        pos: { x, y },
        dir: { x: px, y: py },
      };
    });

  for (let i = 0; i < 100; i++) {
    x.forEach((robot) => {
      const newPos = move2(robot.pos, robot.dir);
      robot.pos.x = mod(newPos.x, width);
      robot.pos.y = mod(newPos.y, height);
    });
  }

  let counts = new Counter<string>();
  for (let { pos } of x) {
    const halfWidth = Math.floor(width / 2);
    const halfHeight = Math.floor(height / 2);

    console.log({ halfHeight, halfWidth });
    if (pos.x < halfWidth && pos.y < halfHeight) counts.add("q1");
    if (pos.x > halfWidth && pos.y < halfHeight) counts.add("q2");
    if (pos.x < halfWidth && pos.y > halfHeight) counts.add("q3");
    if (pos.x > halfWidth && pos.y > halfHeight) counts.add("q4");
  }

  const grid = new SparseGrid<number>();

  for (let { pos } of x) {
    grid.set(pos, (grid.get(pos) || 0) + 1);
  }
  grid.print();
  console.log([...counts.entries()]);

  return product(counts.values());
};

export const part2 = (useTestData: boolean = false): number => {
  const width = useTestData ? 11 : 101;
  const height = useTestData ? 7 : 103;

  const input = readInput(useTestData);
  const x = lineify(input)
    .map((x) => intify(x))
    .map(([x, y, px, py]) => {
      return {
        pos: { x, y },
        dir: { x: px, y: py },
      };
    });

  let exit = false;
  let result: number = 0;
  for (let i = 0; i < 100_000; i++) {
    if (exit) break;
    if (i % 1000 === 0) {
      console.log(i);
    }
    x.forEach((robot) => {
      const newPos = move2(robot.pos, robot.dir);
      robot.pos.x = mod(newPos.x, width);
      robot.pos.y = mod(newPos.y, height);
    });

    const grid = new SparseGrid<number>();
    for (let { pos } of x) {
      grid.set(pos, (grid.get(pos) || 0) + 1);
    }

    for (let a = 0; a < width; a++) {
      if (exit) break;
      for (let b = 0; b < height; b++) {
        if (exit) break;
        let tree = true;
        for (let i = 0; i < 17; i++) {
          const g = grid.get({ x: a, y: b + i });
          if (g === undefined) {
            tree = false;
            break;
          }
        }
        if (tree) {
          exit = true;
          result = i + 1;
          break;
        }
      }
    }
  }

  return result;
};
