import { HashMap, HashSet, intify, lineify, readInput, windows } from "~utils";

const round = (n: bigint) => {
  let nn = n;
  // multiply by 64
  let t64 = nn * BigInt(64);

  // mix into secret number
  let m1 = nn ^ t64;
  // prune
  let m2 = m1 % BigInt(16777216);

  let t32: bigint = m2 / BigInt(32);
  let m3 = m2 ^ t32;
  let m4 = m3 % BigInt(16777216);

  let t2048 = m4 * BigInt(2048);
  let m5 = m4 ^ t2048;
  let m6 = m5 % BigInt(16777216);

  return m6;
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const initials = lineify(input).map((x) => intify(x)[0]);

  let total: bigint = BigInt(0);
  for (const num of initials) {
    let n = BigInt(num);
    for (let i = 0; i < 2000; i++) {
      n = round(n);
    }
    total += n;
  }

  // solution here
  return total as unknown as number;
};

type Sequence = [bigint, bigint, bigint, bigint];
export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const initials = lineify(input).map((x) => intify(x)[0]);

  const allSequences = new HashSet<Sequence>();
  const monkeySequences: HashMap<Sequence, bigint>[] = [];

  for (const num of initials) {
    let n = BigInt(num);
    let allOfEm: [bigint, bigint][] = [];
    for (let i = 0; i < 2_000; i++) {
      const next = round(n);
      allOfEm.push([(next % BigInt(10)) - (n % BigInt(10)), next % BigInt(10)]);
      n = next;
    }

    const m = new HashMap<Sequence, bigint>();
    for (const seq of windows(allOfEm.slice(0, allOfEm.length - 1), 4)) {
      const s = seq.map((x) => x[0]);
      const v = seq[3][1];
      if (!m.has(s as Sequence)) {
        m.set(s as Sequence, v);
      }
      allSequences.add(s as Sequence);
    }
    monkeySequences.push(m);
  }

  let best = BigInt(0);

  let count = 0;
  for (const seq of allSequences.keys()) {
    let total = BigInt(0);
    for (const m of monkeySequences) {
      const v = m.get(seq) || BigInt(0);
      total += v;
    }
    if (total > best) {
      best = total;
    }
  }

  return best as unknown as number;
};
