import { add, Counter, intify, readInput } from "~utils";

const simulateFish = (lanterns: number[], iterations: number) => {
  let fish = new Counter(lanterns);

  for (let i = 0; i < iterations; i++) {
    let newFish = new Counter<number>();

    fish.forEach((v, k) => {
      if (k === 0) {
        newFish.set(6, (newFish.get(6) ?? 0) + v);
        newFish.set(8, (newFish.get(8) ?? 0) + v);
      } else {
        newFish.set(k - 1, (newFish.get(k - 1) ?? 0) + v);
      }
    });
    fish = newFish;
  }

  return [...fish.values()].reduce(add, 0);
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const ints = intify(input);

  return simulateFish(ints, 80);
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const ints = intify(input);

  return simulateFish(ints, 256);
};
