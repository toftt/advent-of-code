import { intify, lineify, readInput } from "~utils";
import { windows } from "~utils/windows";

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

const isSafe2 = (report: number[]) => {
  if (isSafe(report)) {
    console.log(`Original ${report} is safe`);
    return true;
  }

  for (let i = 0; i < report.length; i++) {
    const ne = report.slice();
    ne.splice(i, 1);
    if (isSafe(ne)) {
      console.log(`Modified ${ne} is safe`);
      return true;
    }
  }

  return false;
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const reports: number[][] = lineify(input).map(intify);

  const safe = reports.filter(isSafe);

  console.log(safe);
  return safe.length;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  const reports: number[][] = lineify(input).map(intify);

  const safe = reports.filter(isSafe2);

  return safe.length;
};
