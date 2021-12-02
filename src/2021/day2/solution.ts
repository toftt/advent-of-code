import { lineify, readInput } from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);

  let depth = 0;
  let xPos = 0;

  lines.forEach((line) => {
    const [dir, rawValue] = line.split(" ");
    const value = parseInt(rawValue);

    if (dir.startsWith("u")) {
      depth -= value;
    }
    if (dir.startsWith("d")) {
      depth += value;
    }
    if (dir.startsWith("f")) {
      xPos += value;
    }
  });

  return depth * xPos;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);

  let aim = 0;
  let depth = 0;
  let xPos = 0;

  lines.forEach((line) => {
    const [dir, rawValue] = line.split(" ");
    const value = parseInt(rawValue);

    if (dir.startsWith("u")) {
      aim -= value;
    }
    if (dir.startsWith("d")) {
      aim += value;
    }
    if (dir.startsWith("f")) {
      xPos += value;
      depth += aim * value;
    }
  });

  return depth * xPos;
};
