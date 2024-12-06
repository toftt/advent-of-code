import { lineify, PriorityQueue, readInput } from "~utils";

interface Node {
  name: string;
  forwardEdges: Node[];
  backwardEdges: Node[];
}

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);
  const ins = lines.map((l) => {
    const m = [...l.matchAll(/tep (\w) /g)];
    return { from: m[0][1], to: m[1][1] };
  });
  const nodes = new Map<string, Node>();

  for (let { from, to } of ins) {
    if (!nodes.has(to)) {
      nodes.set(to, { name: to, forwardEdges: [], backwardEdges: [] });
    }

    if (!nodes.has(from)) {
      nodes.set(from, { name: from, forwardEdges: [], backwardEdges: [] });
    }

    const fromNode = nodes.get(from)!;
    const toNode = nodes.get(to)!;

    fromNode.forwardEdges.push(toNode);
    toNode.backwardEdges.push(fromNode);
  }

  const startingNode = [...nodes.values()].filter(
    (n) => n.backwardEdges.length === 0,
  );

  const toProcess = new Set<Node>(startingNode);
  const processed = new Set<string>();
  let result = "";

  while (toProcess.size > 0) {
    const eligible = [...toProcess].filter((n) =>
      n.backwardEdges.every((e) => processed.has(e.name)),
    );
    const current = eligible.sort((a, b) => a.name.localeCompare(b.name))[0];
    result += current.name;
    processed.add(current.name);
    toProcess.delete(current);

    for (let n of current.forwardEdges) {
      toProcess.add(n);
    }
  }

  console.log(result);
  return 0;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);
  const ins = lines.map((l) => {
    const m = [...l.matchAll(/tep (\w) /g)];
    return { from: m[0][1], to: m[1][1] };
  });
  const nodes = new Map<string, Node>();

  for (let { from, to } of ins) {
    if (!nodes.has(to)) {
      nodes.set(to, { name: to, forwardEdges: [], backwardEdges: [] });
    }

    if (!nodes.has(from)) {
      nodes.set(from, { name: from, forwardEdges: [], backwardEdges: [] });
    }

    const fromNode = nodes.get(from)!;
    const toNode = nodes.get(to)!;

    fromNode.forwardEdges.push(toNode);
    toNode.backwardEdges.push(fromNode);
  }

  const startingNode = [...nodes.values()].filter(
    (n) => n.backwardEdges.length === 0,
  );

  const toProcess = new Set<Node>(startingNode);
  const processed = new Set<string>();
  let result = "";

  while (toProcess.size > 0) {
    const eligible = [...toProcess].filter((n) =>
      n.backwardEdges.every((e) => processed.has(e.name)),
    );
    const current = eligible.sort((a, b) => a.name.localeCompare(b.name))[0];
    result += current.name;
    processed.add(current.name);
    toProcess.delete(current);

    for (let n of current.forwardEdges) {
      toProcess.add(n);
    }
  }

  console.log(result);
  return 0;
};
