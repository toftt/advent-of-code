import { lineify, readInput } from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  const escaped = input
    .replace(/\\\\/g, "X")
    .replace(/\\"/g, "X")
    .replace(/\\x([a-fA-F0-9]){2}/g, "X");

  const codeLength = input.replace(/\r?\n/g, "").length;
  const memoryLength = lineify(escaped).reduce(
    (acc, l) => acc + l.length - 2,
    0
  );

  return codeLength - memoryLength;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  const escaped = input.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

  const lines = lineify(escaped);
  const codeLength = input.replace(/\r?\n/g, "").length;
  const len = lines.reduce((acc, l) => acc + l.length + 2, 0);

  return len - codeLength;
};
