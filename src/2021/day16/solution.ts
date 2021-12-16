import { add, mult, readInput } from "~utils";

interface Packet {
  version: number;
  type: number;
  value?: number;
  subPackets?: Packet[];
}

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  let binary = "";

  for (const c of input) {
    const binRep = parseInt(c, 16);
    const strRep = binRep.toString(2).padStart(4, "0");
    binary += strRep;
  }

  let idx = 0;
  let sum = 0;

  const parseLiteral = (str: string) => {
    let number = "";

    while (true) {
      const group = str.slice(idx, idx + 5);
      number += group.slice(1);
      idx += 5;

      if (group[0] === "0") break;
    }

    return parseInt(number, 2);
  };

  const parsePacket = (str: string): Packet => {
    if (idx > str.length) throw new Error("somethings gone wrong");

    const version = parseInt(str.slice(idx, idx + 3), 2);
    idx += 3;

    sum += version;

    const type = parseInt(str.slice(idx, idx + 3), 2);
    idx += 3;

    if (type === 4) {
      const number = parseLiteral(str);

      return { version, type, value: number };
    } else {
      // operator packet
      const lengthType = parseInt(str.slice(idx, idx + 1), 2);
      idx += 1;

      if (lengthType === 0) {
        const len = parseInt(str.slice(idx, idx + 15), 2);
        idx += 15;

        const subPackets: Packet[] = [];
        const endIdx = idx + len;

        while (idx < endIdx) subPackets.push(parsePacket(str));

        return { version, type, subPackets };
      } else {
        const numPackets = parseInt(str.slice(idx, idx + 11), 2);
        idx += 11;

        const subPackets: Packet[] = [];
        for (let i = 0; i < numPackets; i++) {
          subPackets.push(parsePacket(str));
        }
        return { version, type, subPackets };
      }
    }
  };

  const packages: Packet[] = [];
  while (idx < binary.length && binary[idx]) {
    packages.push(parsePacket(binary));
  }

  // solution here
  return sum;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  let binary = "";

  for (const c of input) {
    const binRep = parseInt(c, 16);
    const strRep = binRep.toString(2).padStart(4, "0");
    binary += strRep;
  }

  let idx = 0;

  const parseLiteral = (str: string) => {
    let number = "";

    while (true) {
      const group = str.slice(idx, idx + 5);
      number += group.slice(1);
      idx += 5;

      if (group[0] === "0") break;
    }

    return parseInt(number, 2);
  };

  const parsePacket = (str: string): Packet => {
    if (idx > str.length) throw new Error("somethings gone wrong");

    const version = parseInt(str.slice(idx, idx + 3), 2);
    idx += 3;

    const type = parseInt(str.slice(idx, idx + 3), 2);
    idx += 3;

    if (type === 4) {
      const number = parseLiteral(str);

      return { version, type, value: number };
    } else {
      // operator packet
      const lengthType = parseInt(str.slice(idx, idx + 1), 2);
      idx += 1;

      if (lengthType === 0) {
        const len = parseInt(str.slice(idx, idx + 15), 2);
        idx += 15;

        const subPackets: Packet[] = [];
        const endIdx = idx + len;

        while (idx < endIdx) subPackets.push(parsePacket(str));

        return { version, type, subPackets };
      } else {
        const numPackets = parseInt(str.slice(idx, idx + 11), 2);
        idx += 11;

        const subPackets: Packet[] = [];
        for (let i = 0; i < numPackets; i++) {
          subPackets.push(parsePacket(str));
        }
        return { version, type, subPackets };
      }
    }
  };

  const getValue = (p: Packet): number => {
    switch (p.type) {
      case 4: {
        return p.value!;
      }
      case 0: {
        return p.subPackets!.map((sub) => getValue(sub)).reduce(add, 0);
      }
      case 1: {
        return p.subPackets!.map((sub) => getValue(sub)).reduce(mult, 1);
      }
      case 2: {
        return Math.min(...p.subPackets!.map((sub) => getValue(sub)));
      }
      case 3: {
        return Math.max(...p.subPackets!.map((sub) => getValue(sub)));
      }
      case 5: {
        return getValue(p.subPackets![0]) > getValue(p.subPackets![1]) ? 1 : 0;
      }
      case 6: {
        return getValue(p.subPackets![0]) < getValue(p.subPackets![1]) ? 1 : 0;
      }
      case 7: {
        return getValue(p.subPackets![0]) === getValue(p.subPackets![1])
          ? 1
          : 0;
      }
    }

    throw new Error("invalid type");
  };

  const packet = parsePacket(binary);

  // solution here
  return getValue(packet);
};
