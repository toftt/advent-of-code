import { lineify, median, readInput } from "~utils";

const opens: Record<string, string> = {
  "{": "}",
  "[": "]",
  "(": ")",
  "<": ">",
};

const closes: Record<string, string> = {
  "]": "[",
  "}": "{",
  ")": "(",
  ">": "<",
};

const closesPoints: Record<string, number> = {
  "[": 57,
  "{": 1197,
  "(": 3,
  "<": 25137,
};

const completePoints: Record<string, number> = {
  "[": 2,
  "{": 3,
  "(": 1,
  "<": 4,
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input).map((x) => x.split(""));

  let sum = 0;
  lines.forEach((line) => {
    const charStack: string[] = [];

    for (const c of line) {
      if (Object.keys(opens).includes(c)) {
        charStack.push(c);
      } else {
        const looking = closes[c];
        if (charStack.length === 0) {
          // incomplete
        }
        const found = charStack[charStack.length - 1];
        if (found === looking) {
          charStack.pop();
        } else {
          sum += closesPoints[looking];
          break;
        }
      }
    }
  });

  return sum;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input).map((x) => x.split(""));

  const total: number[] = [];
  lines.forEach((line) => {
    const charStack: string[] = [];

    let corrupt = false;
    for (const c of line) {
      if (Object.keys(opens).includes(c)) {
        charStack.push(c);
      } else {
        const looking = closes[c];
        if (charStack.length === 0) {
          // incomplete
        }
        const found = charStack[charStack.length - 1];
        if (found === looking) {
          charStack.pop();
        } else {
          corrupt = true;
          break;
        }
      }
    }
    if (!corrupt) {
      let sum = 0;
      charStack.reverse().forEach((cc) => {
        sum *= 5;
        sum += completePoints[cc];
      });
      total.push(sum);
    }
  });

  return median(total);
};
