import { add, intify, median, readInput } from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const ints = intify(input);

  const med = median(ints);

  return ints.reduce((acc, a) => acc + Math.abs(a - med), 0);
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const positions = intify(input);

  let minFuel = Infinity;
  for (let i = Math.min(...positions); i <= Math.max(...positions); i++) {
    const fuel = positions
      .map((pos) => {
        const dist = Math.abs(pos - i);
        return (dist * (dist + 1)) / 2;
      })
      .reduce(add, 0);

    minFuel = fuel < minFuel ? fuel : minFuel;
  }

  return minFuel;
};
