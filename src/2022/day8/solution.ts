import { lineify, mult, parseInts, readInput } from "~utils";

interface Position {
  x: number;
  y: number;
}

const isInBounds = (grid: number[][], pos: Position) => {
  return (
    pos.y >= 0 && pos.y < grid.length && pos.x >= 0 && pos.x < grid[0].length
  );
};

const isVisible = (grid: number[][], treePosition: Position) => {
  const treeHeight = grid[treePosition.y][treePosition.x];

  const directionFns = [
    (p: Position) => ({ x: p.x + 1, y: p.y }),
    (p: Position) => ({ x: p.x - 1, y: p.y }),
    (p: Position) => ({ x: p.x, y: p.y + 1 }),
    (p: Position) => ({ x: p.x, y: p.y - 1 }),
  ];

  for (const fn of directionFns) {
    let current = fn(treePosition);
    let visible = true;

    while (isInBounds(grid, current)) {
      if (grid[current.y][current.x] >= treeHeight) {
        visible = false;
        break;
      }
      current = fn(current);
    }

    if (visible) return true;
  }

  return false;
};

const scenicScore = (grid: number[][], treePosition: Position) => {
  const treeHeight = grid[treePosition.y][treePosition.x];

  // right, left, down, up
  const directionFns = [
    (p: Position) => ({ x: p.x + 1, y: p.y }),
    (p: Position) => ({ x: p.x - 1, y: p.y }),
    (p: Position) => ({ x: p.x, y: p.y + 1 }),
    (p: Position) => ({ x: p.x, y: p.y - 1 }),
  ];

  let scores: number[] = [];
  for (const fn of directionFns) {
    let current = fn(treePosition);
    let score = 0;

    while (isInBounds(grid, current)) {
      score += 1;

      if (grid[current.y][current.x] >= treeHeight) {
        break;
      }

      current = fn(current);
    }
    scores.push(score);
  }

  return scores.reduce(mult);
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid: number[][] = lineify(input).map((line) =>
    parseInts(line.split(""))
  );

  let count = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (isVisible(grid, { x, y })) count++;
    }
  }
  return count;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid: number[][] = lineify(input).map((line) =>
    parseInts(line.split(""))
  );

  let maxScore = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const score = scenicScore(grid, { x, y });
      maxScore = Math.max(score, maxScore);
    }
  }
  return maxScore;
};
