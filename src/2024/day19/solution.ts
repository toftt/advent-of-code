import { Counter, lineify, PriorityQueue, readInput, sections } from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const [t, d] = sections(input);

  const towels = t.split(", ").map((x) => x.trim());
  const designs = lineify(d).map((x) => x.trim());

  let total = 0;
  let count = 0;
  for (const design of designs) {
    const seen = new Set();
    let dd = [design];

    outer: while (dd.length > 0) {
      const x = dd.pop()!;
      seen.add(x);
      for (const tt of towels) {
        if (x.endsWith(tt)) {
          if (x.length === tt.length) {
            total++;
            break outer;
          }
          const toPush = x.substring(0, x.length - tt.length);
          if (!seen.has(toPush)) {
            dd.push(x.substring(0, x.length - tt.length));
          }
        }
      }
    }
    console.log(seen);
  }

  // solution here
  return total;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const [t, d] = sections(input);

  const towels = t.split(", ").map((x) => x.trim());
  const designs = lineify(d).map((x) => x.trim());

  const cache = new Map<string, number>();
  const possibleDesigns = (pDesign: string): number => {
    if (pDesign === "") return 1;
    if (cache.has(pDesign)) return cache.get(pDesign)!;
    const valid = towels.filter((x) => pDesign.endsWith(x));

    let total = 0;
    for (const v of valid) {
      total += possibleDesigns(pDesign.substring(0, pDesign.length - v.length));
    }

    cache.set(pDesign, total);
    return total;
  };

  let result = 0;
  for (const design of designs) {
    result += possibleDesigns(design);
  }

  return result;
};
