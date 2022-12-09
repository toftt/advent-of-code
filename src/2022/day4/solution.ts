import { intify, lineify, readInput } from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);

  let count = 0;
  lines.forEach((line) => {
    const [s1, e1, s2, e2] = intify(line.replace(/-/g, "*"));
    if ((s1 >= s2 && e1 <= e2) || (s1 <= s2 && e1 >= e2)) count++;
  });

  return count;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);

  let count = 0;
  lines.forEach((line) => {
    const [s1, e1, s2, e2] = intify(line.replace(/-/g, "*"));

    if (s1 <= s2 && e1 >= s2) count++;
    else if (s2 <= s1 && e2 >= s1) count++;
  });

  return count;
};
