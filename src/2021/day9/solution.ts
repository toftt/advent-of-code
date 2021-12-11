import { lineify, readInput, SparseGrid, sum } from "~utils";

const getLowPoints = (grid: SparseGrid<number>) => {
  const lowPoints: number[] = [];
  grid.entries().forEach(([k, v]) => {
    if (grid.adjecent(k).every((adjPos) => grid.get(adjPos)! > v)) {
      lowPoints.push(v);
    }
  });
  return lowPoints;
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid = SparseGrid.fromString(input);

  return sum(getLowPoints(grid).map((x) => x + 1));
};

interface Point {
  x: number;
  y: number;
  val: number;
}
export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input).map((x) => x.split("").map((x) => parseInt(x)));

  const points: Point[] = [];
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      points.push({ x: i, y: j, val: lines[i][j] });
    }
  }

  points.sort((a, b) => a.val - b.val);
  const seen = new Set<string>();
  const addSeen = (p: Point) => seen.add(`x${p.x}y${p.y}`);
  const hasSeen = (p: Point) => seen.has(`x${p.x}y${p.y}`);

  const sizes: number[] = [];

  for (const p of points) {
    if (hasSeen(p)) continue;
    if (p.val === 9) continue;

    const q = [p];

    let size = 0;
    while (q.length !== 0) {
      const current = q.pop()!;

      if (hasSeen(current)) continue;
      if (current.val === 9) continue;

      addSeen(current);

      const surrounding: Point[] = [
        [current.x + 1, current.y],
        [current.x - 1, current.y],
        [current.x, current.y + 1],
        [current.x, current.y - 1],
      ].map((p) => {
        return { x: p[0], y: p[1], val: lines[p[0]]?.[p[1]] ?? 9 };
      });

      size += 1;

      // const adj = surrounding.filter((s) => s.val === current.val + 1);
      q.push(...surrounding);
    }
    sizes.push(size);
  }

  sizes.sort((a, b) => b - a);

  return sizes[0] * sizes[1] * sizes[2];
};
