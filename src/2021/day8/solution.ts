import { stringify } from "querystring";
import { group, intify, lineify, readInput } from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);

  let count = 0;
  lines.forEach((line) => {
    const [input, output] = line.split(" | ").map((x) => x.split(" "));

    const occs = output
      .map((x) => x.length)
      .filter((x) => [2, 4, 3, 7].includes(x)).length;
    count += occs;
  });

  return count;
};

const LETTERS = "abcdefg";
const CASES = [
  "abcefg",
  "cf",
  "acdeg",
  "acdfg",
  "bcdf",
  "abdfg",
  "abdefg",
  "acf",
  "abcdefg",
  "abcdfg",
];

const isCorrect = (puts: string[], mapping: Record<string, string>) => {
  const mapped = puts.map((s) =>
    s
      .split("")
      .map((x) => mapping[x])
      .sort((a, b) => a.localeCompare(b))
      .join("")
  );
  return mapped.every((mapped) => CASES.includes(mapped));
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);

  let finalSum = 0;
  lines.forEach((line) => {
    const [codes, output] = line.split(" | ").map((x) => x.split(" "));

    const mapping: Record<string, string[]> = {
      a: LETTERS.split(""),
      b: LETTERS.split(""),
      c: LETTERS.split(""),
      d: LETTERS.split(""),
      e: LETTERS.split(""),
      f: LETTERS.split(""),
      g: LETTERS.split(""),
    };

    codes.forEach((inp) => {
      if (inp.length === 2) {
        mapping[inp[0]] = mapping[inp[0]].filter((x) => ["c", "f"].includes(x));
        mapping[inp[1]] = mapping[inp[1]].filter((x) => ["c", "f"].includes(x));
      }

      if (inp.length === 3) {
        mapping[inp[0]] = mapping[inp[0]].filter((x) =>
          ["a", "c", "f"].includes(x)
        );
        mapping[inp[1]] = mapping[inp[1]].filter((x) =>
          ["a", "c", "f"].includes(x)
        );
        mapping[inp[2]] = mapping[inp[2]].filter((x) =>
          ["a", "c", "f"].includes(x)
        );
      }

      if (inp.length === 4) {
        mapping[inp[0]] = mapping[inp[0]].filter((x) =>
          ["b", "c", "d", "f"].includes(x)
        );
        mapping[inp[1]] = mapping[inp[1]].filter((x) =>
          ["b", "c", "d", "f"].includes(x)
        );
        mapping[inp[2]] = mapping[inp[2]].filter((x) =>
          ["b", "c", "d", "f"].includes(x)
        );
        mapping[inp[3]] = mapping[inp[3]].filter((x) =>
          ["b", "c", "d", "f"].includes(x)
        );
      }
    });

    for (let i = 0; i < 10; i++) {
      for (const key of Object.keys(mapping)) {
        const value = mapping[key].join("");
        const len = value.length;

        const sameValue: string[] = [key];
        for (const otherKey of Object.keys(mapping)) {
          if (otherKey === key) continue;
          if (mapping[otherKey].join("") === value) {
            sameValue.push(otherKey);
          }
        }

        if (len === sameValue.length) {
          for (const remove of Object.keys(mapping)) {
            if (sameValue.includes(remove)) continue;
            mapping[remove] = mapping[remove].filter(
              (x) => !mapping[key].includes(x)
            );
          }
        }
      }
    }

    const mappings: Record<string, string>[] = [];
    const queue: { mapper: Record<string, string[]>; pool: string[] }[] = [];

    queue.push({ mapper: { ...mapping }, pool: LETTERS.split("") });

    while (queue.length !== 0) {
      const cur = queue.pop()!;

      const mapper = { ...cur.mapper };
      const pool = [...cur.pool];

      if (pool.length === 0) {
        const res = Object.entries(mapper).reduce((acc, [key, value]) => {
          acc[key] = value[0];
          return acc;
        }, {} as any);
        mappings.push(res);
        continue;
      }

      const nextLetter = pool.pop()!;

      Object.entries(mapper).forEach(([key, value]) => {
        if (value.includes(nextLetter)) {
          queue.push({
            mapper: { ...mapper, [key]: [nextLetter] },
            pool: [...pool],
          });
        }
      });
    }

    mappings.forEach((m) => {
      if (isCorrect(codes, m)) {
        let digits = "";
        output.forEach((out) => {
          const mapped = out
            .split("")
            .map((x) => m[x])
            .sort((a, b) => a.localeCompare(b))
            .join("");
          const digit = CASES.indexOf(mapped);
          digits += digit.toString();
        });
        finalSum += parseInt(digits);
      }
    });
  });
  return finalSum;
};
