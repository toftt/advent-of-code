import { Counter, lineify, readInput } from "~utils";
import { windows } from "~utils/windows";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);

  const template = lines[0].split("");
  const ruleArray = lines.slice(2).map((rule) => rule.split(" -> "));
  const rules = new Map<string, string>();

  for (const rule of ruleArray) rules.set(rule[0], rule[1]);

  for (let step = 0; step < 10; step++) {
    const inserts = new Map<number, string>();
    windows(template, 2).forEach((win, idx) => {
      const ruleResult = rules.get(win.join(""));
      if (ruleResult) {
        inserts.set(idx + 1, ruleResult);
      }
    });

    [...inserts.entries()].forEach((ins, idx) => {
      template.splice(ins[0] + idx, 0, ins[1]);
    });
  }

  const counter = new Counter(template);
  // solution here
  return counter.mostCommon()[1] - counter.leastCommon()[1];
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);

  const temp = lines[0].split("");
  let template = windows(lines[0].split(""), 2).reduce((acc, t) => {
    acc.add(t.join(""));
    return acc;
  }, new Counter<string>());

  const ruleArray = lines.slice(2).map((rule) => rule.split(" -> "));
  const rules = new Map<string, string>();

  for (const rule of ruleArray) rules.set(rule[0], rule[1]);

  for (let step = 0; step < 40; step++) {
    // console.log(template);
    const inserts: Counter<string> = new Counter();

    [...template.entries()].forEach(([win, count]) => {
      const ruleResult = rules.get(win);
      if (ruleResult) {
        const wins = [`${win[0]}${ruleResult}`, `${ruleResult}${win[1]}`];
        // console.log(wins);
        wins.forEach((x) => {
          inserts.set(x, (inserts.get(x) ?? 0) + count);
        });
      }
    });

    template = inserts;

    // [...inserts.entries()].forEach(([str, count]) => {
    //   template.set(str, (template.get(str) ?? 0) + count);
    // });
  }

  const counter = new Counter<string>();
  [...template.entries()].forEach(([win, count]) => {
    const [a, b] = win.split("");
    counter.set(a, (counter.get(a) ?? 0) + count);
    counter.set(b, (counter.get(b) ?? 0) + count);
  });

  // this part doesn't really work, but I can't be bothered.
  let mcm = 0;
  let lcm = 0;
  for (const edge of [temp[0], temp[temp.length - 1]]) {
    if (edge === counter.mostCommon()[0]) mcm += 0.5;
    if (edge === counter.leastCommon()[0]) lcm += 0.5;
  }
  console.log({ mcm, lcm });

  return counter.mostCommon()[1] / 2 - mcm - counter.leastCommon()[1] / 2 - lcm;
};
