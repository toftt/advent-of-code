import { readInput, lineify, intify, group } from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  const g = input.matchAll(/mul\((\d+),(\d+)\)/g);

  let total = 0;
  for (const m of [...g]) {
    total += parseInt(m[1]) * parseInt(m[2]);
  }

  return total;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  const g = input.matchAll(/mul\((\d+),(\d+)\)/g);
  const a = input.matchAll(/(do)\(\)/g);
  const b = input.matchAll(/(don)'t\(\)/g);

  const allMatches = [...g, ...a, ...b];

  const sorted = allMatches.sort((a, b) => a.index! - b.index!);

  let total = 0;
  let enabled = true;
  for (const m of sorted) {
    if (m[1] === "do") {
      enabled = true;
      continue;
    }
    if (m[1] === "don") {
      enabled = false;
      continue;
    }

    if (enabled) {
      total += parseInt(m[1]) * parseInt(m[2]);
    }
  }

  return total;
};
