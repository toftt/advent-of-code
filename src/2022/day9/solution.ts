import { enumerate, lineify, readInput } from "~utils";
import { windows } from "~utils/windows";

interface Pos2D {
  x: number;
  y: number;
}

const rotate = (p: Pos2D, theta: number) => {
  return {
    x: Math.round(Math.cos(theta) * p.x - Math.sin(theta) * p.y),
    y: Math.round(Math.sin(theta) * p.x + Math.cos(theta) * p.y),
  };
};

const up = (p: Pos2D) => ({ ...p, y: p.y - 1 });
const down = (p: Pos2D) => ({ ...p, y: p.y + 1 });
const left = (p: Pos2D) => ({ ...p, x: p.x - 1 });
const right = (p: Pos2D) => ({ ...p, x: p.x + 1 });

type Dir = "U" | "D" | "R" | "L";
const moves = {
  U: up,
  R: right,
  L: left,
  D: down,
};

const distance = (a: Pos2D, b: Pos2D): number =>
  Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

const moveTail = (
  dir: "U" | "D" | "R" | "L",
  head: Pos2D,
  tail: Pos2D
): Pos2D => {
  let newTailPos = { ...tail };
  const dist = distance(head, tail);

  const xDist = head.x - tail.x;
  const yDist = head.y - tail.y;
  if (dist > 2) {
    newTailPos = { x: tail.x + Math.sign(xDist), y: tail.y + Math.sign(yDist) };
  } else if (dist === 2) {
    newTailPos =
      xDist !== 0
        ? { ...tail, x: tail.x + Math.sign(xDist) }
        : { ...tail, y: tail.y + Math.sign(yDist) };
  }
  return newTailPos;
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const directions = lineify(input)
    .map((line) => line.split(" ", 2))
    .map(
      ([direction, amount]) => [direction, parseInt(amount)] as [Dir, number]
    );

  let headPos = { x: 0, y: 0 };
  let tailPos = { ...headPos };
  const visited = new Set<string>();
  visited.add("x0y0");

  for (const [dir, n] of directions) {
    for (let i = 0; i < n; i++) {
      headPos = moves[dir](headPos);
      tailPos = moveTail(dir, headPos, tailPos);
      visited.add(`x${tailPos.x}y${tailPos.y}`);
    }
  }

  return visited.size;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const directions = lineify(input)
    .map((line) => line.split(" ", 2))
    .map(
      ([direction, amount]) => [direction, parseInt(amount)] as [Dir, number]
    );

  const positions = new Array(10).fill(0).map((_) => ({ x: 0, y: 0 }));
  const visited = new Set<string>();
  visited.add("x0y0");

  for (const [dir, n] of directions) {
    for (let i = 0; i < n; i++) {
      positions[0] = moves[dir](positions[0]);
      for (const [[h, t], idx] of enumerate(windows(positions, 2))) {
        const nt = moveTail(dir, h, t);
        positions[idx + 1] = nt;
        if (idx === positions.length - 2) {
          visited.add(`x${nt.x}y${nt.y}`);
        }
      }
    }
  }

  return visited.size;
};
