import { readInput } from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  const answer = input.split("").reduce((currentFloor, instruction) => {
    switch (instruction) {
      case "(":
        return currentFloor + 1;
      case ")":
        return currentFloor - 1;
      default:
        throw new Error("Invalid instruction");
    }
  }, 0);

  return answer;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  let currentFloor = 0;
  let steps = 0;

  for (const char of input) {
    if (currentFloor < 0) break;

    steps++;
    switch (char) {
      case "(": {
        currentFloor += 1;
        break;
      }
      case ")": {
        currentFloor -= 1;
        break;
      }
      default:
        throw new Error("Invalid instruction");
    }
  }

  return steps;
};
