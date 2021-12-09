import { stringify } from "querystring";
import { lineify, readInput, sum } from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input).map((x) => x.split(""));

  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      const surrounding: number[] = [
        [i + 1, j],
        [i - 1, j],
        [i, j + 1],
        [i, j - 1],
      ].map((p) => {
        return parseInt(lines[p[0]]?.[p[1]] ?? 1000);
      });

      const isLow = surrounding.every((p) => parseInt(lines[i][j]) < p);
      if (isLow) sum += parseInt(lines[i][j]) + 1;
    }
  }

  // solution here
  return sum;
};

interface Point {
  x: number;
  y: number;
  val: number;
}
const getLowPoints = (lines: string[][]) => {
  let points: Point[] = [];
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      const surrounding: number[] = [
        [i + 1, j],
        [i - 1, j],
        [i, j + 1],
        [i, j - 1],
      ].map((p) => {
        return parseInt(lines[p[0]]?.[p[1]] ?? 1000);
      });

      const isLow = surrounding.every((p) => parseInt(lines[i][j]) < p);
      if (isLow) {
        points.push({ x: i, y: j, val: parseInt(lines[i][j]) });
      }
    }
  }

  // solution here
  return points;
};

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
  console.log(sizes.sort((a, b) => b - a));
  console.log(sum(sizes));
  console.log(points.filter((x) => !hasSeen(x) && x.val !== 9));

  return sizes[0] * sizes[1] * sizes[2];
};
export const part3 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input).map((x) => x.split("").map((x) => parseInt(x)));

  const points: Point[] = [];
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      points.push({ x: i, y: j, val: lines[i][j] });
    }
  }

  const seenMaxes = new Map<string, { group: string; max: number }>();
  const addSeenMax = (s: string, max: number, group: string) => {
    const prev = seenMaxes.get(s) ?? { group: "", max: 0 };

    seenMaxes.set(s, max > prev.max ? { group, max } : prev);
  };

  const sizes: number[] = [];
  points.sort((a, b) => a.val - b.val);
  for (const p of points) {
    // for (const p of [{ x: 2, y: 2, val: 5 }]) {
    if (p.val === 9) continue;
    //if (hasSeen(p)) continue;

    const q = [p];

    let size = 0;

    const seen = new Set<string>();
    const addSeen = (p: Point) => seen.add(`x${p.x}y${p.y}`);
    const hasSeen = (p: Point) => seen.has(`x${p.x}y${p.y}`);

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
        return { x: p[0], y: p[1], val: lines[p[0]]?.[p[1]] ?? 1000 };
      });

      size += 1;

      const adj = surrounding.filter((s) => s.val === current.val + 1);
      q.push(...adj);
    }

    const groupId = Math.random();
    for (const point of seen) {
      addSeenMax(point, size, groupId.toFixed(5));
    }
    if ([100, 92, 86].includes(size)) console.log(seen);

    sizes.push(size);
  }

  sizes.sort((a, b) => b - a);

  const result = [...seenMaxes.entries()].reduce((acc, [k, v]) => {
    acc[v.group] = v.max;
    return acc;
  }, {} as any);

  const ff: any[] = Object.values(result).sort((a: any, b: any) => b - a);

  // console.log(result);
  console.log(ff);

  // solution here
  return ff[0] * ff[1] * ff[2];
};
