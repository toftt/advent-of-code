import { enumerate, readInput } from "~utils";
import { windows } from "~utils/windows";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  for (const [window, idx] of enumerate(windows(input.split(""), 4))) {
    if (window.length === new Set(window).size) return idx + 4;
  }
  throw "Couldn't find solution.";
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  for (const [window, idx] of enumerate(windows(input.split(""), 14))) {
    if (window.length === new Set(window).size) return idx + 14;
  }
  throw "Couldn't find solution.";
};
