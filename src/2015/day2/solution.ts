import { group, intify, mult, objectify, readInput, sum } from "~utils";

const input = readInput();
const ints = intify(input);
const groups = group(ints, 3);

const objects = groups.map(objectify(<const>["l", "w", "h"]));

export const part1 = () => {
  return objects.reduce((acc, { w, l, h }) => {
    const s1 = l * w;
    const s2 = w * h;
    const s3 = h * l;
    const extra = Math.min(s1, s2, s3);

    const paper = s1 * 2 + s2 * 2 + s3 * 2 + extra;

    return acc + paper;
  }, 0);
};

export const part2 = () => {
  return objects.reduce((acc, { w, l, h }) => {
    const mins = [w, l, h].sort((a, b) => b - a).slice(1);

    const wrap = sum(mins.map(mult(2)));
    const bow = w * l * h;

    return acc + wrap + bow;
  }, 0);
};
