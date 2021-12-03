import { Counter, lineify, readInput, parseInts, zip } from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input).map((bin) => bin.split(""));

  const perPosition = zip(...lines).map((x) => new Counter(x));

  const gammaString = perPosition.map((c) => c.mostCommon()[0]).join("");
  const epsilonString = perPosition.map((c) => c.leastCommon()[0]).join("");

  const [gamma, epsilon] = [gammaString, epsilonString].map((x) =>
    parseInt(x, 2)
  );

  return gamma * epsilon;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);

  const countsOfIndex = (arr: string[], idx: number) => {
    const counter = new Counter(arr.map((x) => x[idx]));

    return { ones: counter.get("1")!, zeroes: counter.get("0")! };
  };

  let gammaCandidates = [...lines];
  for (let idx = 0; idx < gammaCandidates[0].length; idx++) {
    const counts = countsOfIndex(gammaCandidates, idx);

    const mostCommon = counts.ones >= counts.zeroes ? "1" : "0";
    gammaCandidates = gammaCandidates.filter(
      (cand) => cand[idx] === mostCommon
    );

    if (gammaCandidates.length === 1) break;
  }

  let epsilonCandidates = [...lines];
  for (let idx = 0; idx < epsilonCandidates[0].length; idx++) {
    const counts = countsOfIndex(epsilonCandidates, idx);

    const leastCommon = counts.ones < counts.zeroes ? "1" : "0";
    epsilonCandidates = epsilonCandidates.filter(
      (cand) => cand[idx] === leastCommon
    );

    if (epsilonCandidates.length === 1) break;
  }

  const gamma = parseInt(gammaCandidates[0], 2);
  const epsilon = parseInt(epsilonCandidates[0], 2);

  return gamma * epsilon;
};
