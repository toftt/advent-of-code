import { enumerate, intify, last, lineify, readInput, sections } from "~utils";

const getInitialStacks = (startingCrates: string[]) => {
  const layers = startingCrates
    .slice(0, startingCrates.length - 1)
    .map((layer) => {
      const crates = [];
      for (let cur = 1; cur < layer.length; cur += 4) {
        crates.push(layer[cur]);
      }
      return crates;
    });

  layers.reverse();
  const stacks = new Array(layers[0].length)
    .fill(undefined)
    .map((_) => [] as string[]);

  for (const layer of layers) {
    for (const [crate, idx] of enumerate(layer)) {
      if (crate !== " ") stacks[idx].push(crate);
    }
  }

  return stacks;
};

export const part1 = (useTestData: boolean = false): string => {
  const input = readInput(useTestData);
  const [startingCrates, instructions] = sections(input).map(lineify);
  const stacks = getInitialStacks(startingCrates);

  for (const instruction of instructions) {
    const [amount, from, to] = intify(instruction);
    for (let i = 0; i < amount; i++) {
      const crateToMove = stacks[from - 1].pop();
      if (!crateToMove) throw "Tried to move crate from empty stack!";

      stacks[to - 1].push(crateToMove);
    }
  }

  return stacks.map(last).join("");
};

export const part2 = (useTestData: boolean = false): string => {
  const input = readInput(useTestData);
  const [startingCrates, instructions] = sections(input).map(lineify);
  const stacks = getInitialStacks(startingCrates);

  for (const instruction of instructions) {
    const [amount, from, to] = intify(instruction);
    const stackFrom = stacks[from - 1];
    const cratesToMove = stackFrom.splice(stackFrom.length - amount, amount);

    stacks[to - 1].push(...cratesToMove);
  }

  return stacks.map(last).join("");
};
