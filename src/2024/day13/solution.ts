import {
  group,
  intify,
  lcm,
  lineify,
  mult,
  product,
  readInput,
  sum,
} from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const configs = group(
    lineify(input).filter((x) => x.trim() !== ""),
    3,
  ).map(([a, b, c]) => ({
    a: { x: intify(a)[0], y: intify(a)[1] },
    b: { x: intify(b)[0], y: intify(b)[1] },
    p: { x: intify(c)[0], y: intify(c)[1] },
  }));

  let total = 0;
  for (const { a, b, p } of configs) {
    let min = Infinity;
    console.log(a);
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        const pos = { x: a.x * i + b.x * j, y: a.y * i + b.y * j };
        if (pos.x === p.x && pos.y === p.y) {
          min = Math.min(min, i * 3 + j);
        }
      }
    }
    if (min !== Infinity) {
      total += min;
    }
  }

  // solution here
  return total;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const configs = group(
    lineify(input).filter((x) => x.trim() !== ""),
    3,
  ).map(([a, b, c]) => ({
    a: { x: intify(a)[0], y: intify(a)[1] },
    b: { x: intify(b)[0], y: intify(b)[1] },
    p: { x: intify(c)[0] + 10000000000000, y: intify(c)[1] + 10000000000000 },
  }));

  let total = 0;
  for (const { a, b, p } of configs) {
    const aLcm = lcm(a.x, a.y);
    let i1 = aLcm;
    let j1 = b.x * (i1 / a.x);
    let p1 = p.x * (i1 / a.x);
    let i2 = aLcm;
    let j2 = b.y * (i2 / a.y);
    let p2 = p.y * (i1 / a.y);

    const j = (p1 - p2) / (j1 - j2);
    const i = (p.x - b.x * j) / a.x;

    if (i === Math.floor(i) && j === Math.floor(j)) {
      total += i * 3 + j;
    }
  }

  // solution here
  return total;
};
