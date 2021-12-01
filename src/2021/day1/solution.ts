import { lineify, parseInts, readInput, sum } from "~utils";
import { windows } from "~utils/windows";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);
  const ints = parseInts(lines);

  const result = windows(ints, 2).filter(([prev, next]) => next > prev).length;

  return result;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);
  const ints = parseInts(lines);

  const result = windows(windows(ints, 3).map(sum), 2).filter(
    ([prev, next]) => next > prev
  ).length;

  return result;
};
