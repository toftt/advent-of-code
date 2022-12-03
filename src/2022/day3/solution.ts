import { add, group, lineify, readInput } from "~utils";

const isUpperCase = (str: string) => str === str.toUpperCase();
const getPriority = (str: string) => {
  if (isUpperCase(str)) return str.charCodeAt(0) - 38;
  return str.charCodeAt(0) - 96;
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);

  return lines
    .map((line) => {
      const [c1, c2] = group(line, line.length / 2);
      const sharedComponents: string[] = [];
      c1.forEach((component) => {
        if (c2.includes(component)) sharedComponents.push(component);
      });

      return getPriority(sharedComponents[0]);
    })
    .reduce(add, 0);
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);

  const groups = group(lines, 3);

  return groups
    .map((group) => {
      const [g1, g2, g3] = group.map((c) => c.split(""));
      const commonInFirstTwoGroups: string[] = [];
      g1.forEach((v) => {
        if (g2.includes(v)) commonInFirstTwoGroups.push(v);
      });

      const commonInAllThreeGroups: string[] = [];
      commonInFirstTwoGroups.forEach((v) => {
        if (g3.includes(v)) commonInAllThreeGroups.push(v);
      });

      return getPriority(commonInAllThreeGroups[0]);
    })
    .reduce(add, 0);
};
