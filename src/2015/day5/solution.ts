import { lineify, readInput } from "~utils";

const input = readInput();
const lines = lineify(input);

const threeVowels = (s: string): boolean => {
  const vowels = "aeiou".split("");

  return s.split("").filter((c) => vowels.includes(c)).length >= 3;
};

const twiceInARow = (s: string): boolean => {
  return /(.)\1/.test(s);
};

const doesNotContain = (s: string): boolean => {
  const disallowed = ["ab", "cd", "pq", "xy"];

  return disallowed.every((d) => !s.includes(d));
};

export const part1 = (): number => {
  const isNice = (s: string) =>
    [threeVowels, twiceInARow, doesNotContain].every((fn) => fn(s));

  return lines.filter(isNice).length;
};

export const part2 = (): number => {
  const rule1 = (s: string) => /((.)(.)).*\1/.test(s);
  const rule2 = (s: string) => /(\w).\1/.test(s);

  const isNice = (s: string) => [rule1, rule2].every((fn) => fn(s));

  return lines.filter(isNice).length;
};
