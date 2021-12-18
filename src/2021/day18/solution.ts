import { lineify, readInput } from "~utils";

type Snail = (string | number)[];
const isNumber = (s: string) => !!s.match(/\d/);
const tokenize = (p: string) => {
  const result: Snail = [];
  let i = 0;
  let num: string = "";

  while (i < p.length) {
    const c = p[i];
    if (isNumber(c)) {
      num += c;
    } else {
      if (num.length !== 0) {
        result.push(parseInt(num));
        num = "";
      }
      result.push(c);
    }
    i++;
  }
  return result;
};

const add = (a: Snail, b: Snail) => {
  return ["[", ...a, ",", ...b, "]"];
};

const findPrevNumberIdx = (s: Snail, idx: number) => {
  for (let i = idx - 1; i >= 0; i--) {
    if (typeof s[i] === "number") return i;
  }
  return null;
};

const findNextNumberIdx = (s: Snail, idx: number) => {
  for (let i = idx + 1; i < s.length; i++) {
    if (typeof s[i] === "number") return i;
  }
  return null;
};

const explode = (s: Snail) => {
  let depth = 0;

  for (let i = 0; i < s.length - 2; i++) {
    const c1 = s[i];

    if (c1 === "[") {
      depth++;
    } else if (c1 === "]") {
      depth--;
    } else if (typeof c1 === "number" && depth > 4) {
      const c2 = s[i + 1];
      const c3 = s[i + 2];

      if (c2 === "," && typeof c3 === "number") {
        const prevNumberIdx = findPrevNumberIdx(s, i);
        const nextNumberIdx = findNextNumberIdx(s, i + 2);

        if (prevNumberIdx) {
          (s[prevNumberIdx] as number) += c1;
        }
        if (nextNumberIdx) {
          (s[nextNumberIdx] as number) += c3;
        }

        s.splice(i - 1, 5, 0);
        return true;
      }
    }
  }
};

const split = (s: Snail) => {
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (typeof c === "number" && c >= 10) {
      const c1 = Math.floor(c / 2);
      const c2 = Math.ceil(c / 2);

      s.splice(i, 1, "[", c1, ",", c2, "]");
      return true;
    }
  }
};

const reduce = (s: Snail) => {
  while (true) {
    if (explode(s)) continue;
    if (split(s)) continue;
    break;
  }
};

type Pair = [number | Pair, number | Pair];
const magnitude = (p: Pair | number): number => {
  if (typeof p === "number") return p;
  return magnitude(p[0]) * 3 + magnitude(p[1]) * 2;
};
const snailMagnitude = (s: Snail) => {
  const pair: Pair = eval(s.join(""));
  return magnitude(pair);
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const snailPairs = lineify(input).map(tokenize);

  const result = snailPairs.slice(1).reduce((acc, s) => {
    const added = add(acc, s);
    reduce(added);
    return added;
  }, snailPairs[0]);

  return snailMagnitude(result);
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const snailPairs = lineify(input).map(tokenize);

  let max = -Infinity;
  for (let i = 0; i < snailPairs.length; i++) {
    for (let j = 0; j < snailPairs.length; j++) {
      if (i == j) continue;

      const added = add(snailPairs[i], snailPairs[j]);
      reduce(added);
      max = Math.max(snailMagnitude(added), max);
    }
  }

  return max;
};
