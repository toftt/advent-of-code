import { combinations, intify, lineify, readInput, windows } from "~utils";

const isSafe = (report: number[]) => {
  let isDistanceCorrect = true;
  let isIncreasing = true;
  let isDecreasing = true;

  for (let [a, b] of windows(report, 2)) {
    const dist = Math.abs(a - b);
    isDistanceCorrect = isDistanceCorrect && dist >= 1 && dist <= 3;

    if (Math.sign(a - b) === -1) {
      isDecreasing = false;
    } else if (Math.sign(a - b) === 1) {
      isIncreasing = false;
    } else {
      isDecreasing = false;
      isIncreasing = false;
    }
  }

  return isDistanceCorrect && (isDecreasing || isIncreasing);
};

const isSafeWithTolerance = (report: number[]) => {
  return [report, ...combinations(report, report.length - 1)].some(isSafe);
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const reports: number[][] = lineify(input).map(intify);

  const safe = reports.filter(isSafe);

  return safe.length;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  const reports: number[][] = lineify(input).map(intify);

  const safe = reports.filter(isSafeWithTolerance);

  return safe.length;
};
