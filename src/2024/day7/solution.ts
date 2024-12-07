import {
  enumerate,
  intify,
  lineify,
  cartesianProduct,
  readInput,
  cartesianPower,
  zip,
  add,
  mult,
} from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);

  let total = 0;
  for (const line of lines) {
    const vals = intify(line);
    const [testNumber, rest] = [vals[0], vals.slice(1)];

    let combinations = cartesianPower([add, mult], rest.length - 1);
    if (
      combinations.some(
        (combination) =>
          zip(combination, rest.slice(1)).reduce(
            (acc, [op, n]) => op(acc, n),
            rest[0],
          ) === testNumber,
      )
    ) {
      total += testNumber;
    }
  }

  return total;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);
  const concat = (a: number, b: number) => parseInt(`${a}${b}`);

  let total = 0;
  for (const line of lines) {
    const vals = intify(line);
    const [testNumber, rest] = [vals[0], vals.slice(1)];

    let combinations = cartesianPower([add, mult, concat], rest.length - 1);
    if (
      combinations.some(
        (combination) =>
          zip(combination, rest.slice(1)).reduce(
            (acc, [op, n]) => op(acc, n),
            rest[0],
          ) === testNumber,
      )
    ) {
      total += testNumber;
    }
  }

  return total;
};
