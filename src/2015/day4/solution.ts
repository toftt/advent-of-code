import crypto from "crypto";
import { readInput } from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  let current = 0;

  while (true) {
    const hash = crypto.createHash("md5");
    hash.update(`${input}${current}`);
    const digest = hash.digest("hex");

    if (digest.slice(0, 5) === "00000") break;

    current++;
  }

  return current;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  let current = 0;

  while (true) {
    const hash = crypto.createHash("md5");
    hash.update(`${input}${current}`);
    const digest = hash.digest("hex");

    if (digest.slice(0, 6) === "000000") break;

    current++;
  }

  return current;
};
