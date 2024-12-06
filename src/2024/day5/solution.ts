import { intify, lineify, readInput, sum } from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);
  const b = lines.findIndex((x) => x === "");
  const [rules, updates] = [
    lines.slice(0, b),
    lines.slice(b).filter((x) => x !== ""),
  ];

  const r = rules.map((l) => {
    const i = intify(l);
    return { before: i[0], after: i[1] };
  });
  const u = updates.map(intify);

  const ta = new Map<number, number[]>();
  const tb = new Map<number, number[]>();

  for (const a of r) {
    if (!ta.has(a.before)) {
      ta.set(a.before, []);
    }

    ta.get(a.before)!.push(a.after);
  }

  for (const a of r) {
    if (!tb.has(a.after)) {
      tb.set(a.after, []);
    }

    tb.get(a.after)!.push(a.before);
  }

  console.log({ ta, tb });
  const correct = u.filter((x) => {
    for (let i = 0; i < x.length - 1; i++) {
      const main = x[i];
      const rest = x.slice(i + 1);

      console.log({ rest, main });
      if (!rest.every((r) => (tb.get(r) || []).includes(main))) return false;
    }
    return true;
  });

  const result = sum(correct.map((x) => x[Math.floor(x.length / 2)]));
  console.log(result);

  return 0;
};

const isCorrect = (x: number[], tb: Map<number, number[]>) => {
  for (let i = 0; i < x.length - 1; i++) {
    const main = x[i];
    const rest = x.slice(i + 1);

    if (!rest.every((r) => (tb.get(r) || []).includes(main))) return false;
  }
  return true;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);
  const b = lines.findIndex((x) => x === "");
  const [rules, updates] = [
    lines.slice(0, b),
    lines.slice(b).filter((x) => x !== ""),
  ];

  const r = rules.map((l) => {
    const i = intify(l);
    return { before: i[0], after: i[1] };
  });
  const u = updates.map(intify);

  const ta = new Map<number, number[]>();
  const tb = new Map<number, number[]>();

  for (const a of r) {
    if (!ta.has(a.before)) {
      ta.set(a.before, []);
    }

    ta.get(a.before)!.push(a.after);
  }

  for (const a of r) {
    if (!tb.has(a.after)) {
      tb.set(a.after, []);
    }

    tb.get(a.after)!.push(a.before);
  }

  console.log({ ta, tb });
  const incorrect = u.filter((x) => {
    for (let i = 0; i < x.length - 1; i++) {
      const main = x[i];
      const rest = x.slice(i + 1);

      if (!rest.every((r) => (tb.get(r) || []).includes(main))) return true;
    }
    return false;
  });

  console.log(incorrect);

  const correct = incorrect.map((x) => {
    while (!isCorrect(x, tb))
      for (let i = 0; i < x.length - 1; i++) {
        for (let j = i + 1; j < x.length; j++) {
          //console.log({ x, a: x[i], b: x[j] });
          const bb = tb.get(x[i]);
          if (bb && bb.includes(x[j])) {
            const tmp = x[i];
            x[i] = x[j];
            x[j] = tmp;
            break;
          }
        }
      }

    return x;
  });

  const result = sum(correct.map((x) => x[Math.floor(x.length / 2)]));
  console.log(result);

  return 0;
};
