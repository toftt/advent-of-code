import { lineify, readInput, intify, zipMany, sum, Counter } from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const nums = lineify(input).map(intify);

  const x1 = nums.map((x) => x[0]);
  const x2 = nums.map((x) => x[1]);

  const sx1 = x1.sort((a, b) => a - b);
  const sx2 = x2.sort((a, b) => a - b);

  return sum(zipMany(sx1, sx2).map(([a, b]) => Math.abs(a - b)));
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const nums = lineify(input).map(intify);

  const x1 = nums.map((x) => x[0]);
  const x2 = nums.map((x) => x[1]);

  const c = new Counter<number>();

  x2.forEach((x) => {
    c.add(x);
  });

  let total = 0;
  for (const el of new Set(x1)) {
    const times = c.get(el) || 0;
    total += el * times;
  }

  return total;
};
