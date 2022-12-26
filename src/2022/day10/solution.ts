import { lineify, mult, partition, readInput, sum } from "~utils";
import { windows } from "~utils/windows";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const instructions = lineify(input);

  let registerValue = 1;
  let cycle = 1;
  let executing: null | number = null;

  const values: number[] = [];

  while (instructions.length) {
    if (cycle === 20 || (cycle - 20) % 40 === 0) {
      values.push(registerValue * cycle);
    }
    if (executing === null) {
      const inst = instructions.shift()!;
      if (inst === "noop") {
      } else {
        const num = parseInt(inst.split(" ")[1]);
        executing = num;
      }
    } else {
      registerValue += executing;
      executing = null;
    }
    cycle++;
  }

  return sum(values);
};

export const part2 = (useTestData: boolean = false): string => {
  const input = readInput(useTestData);
  const instructions = lineify(input);

  let registerValue = 1;
  let cycle = 1;
  let executing: null | number = null;

  const pixels: string[] = [];

  while (instructions.length) {
    const crtPosition = (cycle - 1) % 40;
    pixels.push(Math.abs(registerValue - crtPosition) <= 1 ? "#" : ".");

    if (executing === null) {
      const inst = instructions.shift()!;
      if (inst === "noop") {
      } else {
        const num = parseInt(inst.split(" ")[1]);
        executing = num;
      }
    } else {
      registerValue += executing;
      executing = null;
    }
    cycle++;
  }

  return [...partition(pixels, 40)].map((row) => row.join("")).join("\n");
};
