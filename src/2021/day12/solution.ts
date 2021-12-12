import { lineify, readInput } from "~utils";

const isSmallCave = (name: string) => name === name.toLowerCase();

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);

  const paths = new Map<string, Set<string>>();

  for (const line of lines) {
    const [from, to] = line.split("-");
    const fromPaths = paths.get(from) ?? new Set();
    const toPaths = paths.get(to) ?? new Set();

    fromPaths.add(to);
    toPaths.add(from);

    paths.set(from, fromPaths).set(to, toPaths);
  }

  const queue = [
    { pos: "start", visited: new Set<string>(["start"]), fullPath: ["start"] },
  ];

  let distinctPaths = [] as {
    pos: string;
    visited: Set<string>;
    fullPath: string[];
  }[];

  while (queue.length !== 0) {
    const { pos, visited, fullPath } = queue.pop()!;
    // console.log({ pos, visited });

    if (pos === "end") {
      distinctPaths.push({ pos, visited, fullPath });
      continue;
    }

    // console.log({ p: paths.get(pos) });
    for (const path of paths.get(pos)!) {
      // console.log({ path });
      if (visited.has(path) && isSmallCave(path)) continue;

      const newVisited = new Set(visited);
      newVisited.add(path);

      queue.push({
        pos: path,
        visited: newVisited,
        fullPath: [...fullPath, path],
      });
    }
  }

  // solution here
  return distinctPaths.length;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);

  const paths = new Map<string, Set<string>>();

  for (const line of lines) {
    const [from, to] = line.split("-");
    const fromPaths = paths.get(from) ?? new Set();
    const toPaths = paths.get(to) ?? new Set();

    fromPaths.add(to);
    toPaths.add(from);

    paths.set(from, fromPaths).set(to, toPaths);
  }

  const queue = [
    {
      pos: "start",
      visited: new Set<string>(["start"]),
      fullPath: ["start"],
      hasVisitedTwice: false,
    },
  ];

  let distinctPaths = [] as {
    pos: string;
    visited: Set<string>;
    fullPath: string[];
  }[];

  while (queue.length !== 0) {
    const { pos, visited, fullPath, hasVisitedTwice } = queue.pop()!;
    // console.log({ pos, visited, hasVisitedTwice });

    if (pos === "end") {
      distinctPaths.push({ pos, visited, fullPath });
      continue;
    }

    // console.log({ p: paths.get(pos) });
    for (const path of paths.get(pos)!) {
      // console.log({ path });

      let newHasVisitedTwice = hasVisitedTwice;
      // can never visit start twice
      if (path === "start") continue;
      if (visited.has(path) && isSmallCave(path)) {
        if (hasVisitedTwice) continue;
        newHasVisitedTwice = true;
      }

      const newVisited = new Set(visited);
      newVisited.add(path);

      queue.push({
        pos: path,
        visited: newVisited,
        fullPath: [...fullPath, path],
        hasVisitedTwice: newHasVisitedTwice,
      });
    }
  }

  // solution here
  return distinctPaths.length;
};
