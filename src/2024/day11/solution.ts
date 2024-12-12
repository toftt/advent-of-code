import { intify, readInput, sum } from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const stones = intify(input);

  let current = stones;
  for (let i = 0; i < 25; i++) {
    //
    let tmp = [];
    for (let s of current) {
      //
      if (s === 0) tmp.push(1);
      else if (`${s}`.length % 2 === 0) {
        //
        const l = `${s}`.length;
        const [a, b] = [`${s}`.slice(0, l / 2), `${s}`.slice(l / 2)];
        tmp.push(parseInt(a));
        tmp.push(parseInt(b));
      } else {
        tmp.push(s * 2024);
      }
    }
    current = tmp;
  }

  return current.length;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const stones = intify(input);

  const sizeCache: Map<string, number> = new Map();
  const calcSize = (s: string): number => {
    if (sizeCache.has(s)) return sizeCache.get(s)!;
    const [n, times] = s.split("|").map((x) => parseInt(x));

    let res: number;
    if (times === 0) res = 1;
    else if (n === 0) res = calcSize(`1|${times - 1}`);
    else if (n.toString().length % 2 === 0) {
      const str = n.toString();
      const l = str.length / 2;
      const a = parseInt(str.slice(0, l));
      const b = parseInt(str.slice(l));
      res = calcSize(`${a}|${times - 1}`) + calcSize(`${b}|${times - 1}`);
    } else {
      res = calcSize(`${n * 2024}|${times - 1}`);
    }
    sizeCache.set(s, res);
    return res;
  };

  const result = sum(stones.map((x) => calcSize(`${x}|75`)));
  console.log(sizeCache.size);
  return result;
};
