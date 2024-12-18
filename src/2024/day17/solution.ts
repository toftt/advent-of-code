import { assert } from "console";
import { group, intify, lineify, readInput, sections } from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const [regs, prog] = sections(input);

  const registers = lineify(regs).flatMap((x) => intify(x));
  const program = intify(prog);

  const instructions = program.slice();

  const getCombo = (a: number) => {
    if (a < 4) {
      return a;
    }
    if (a === 4) return registers[0];
    if (a === 5) return registers[1];
    if (a === 6) return registers[2];

    throw "No register";
  };

  let ip = 0;
  let count = 0;
  let output: number[] = [];

  while (ip < instructions.length) {
    if (count++ > 50) break;
    const op = instructions[ip];
    const l = instructions[ip + 1];

    console.log(
      `Before\nIP: ${ip}\nop: ${op}\nl: ${l}\nRegisters:
      ${registers[0].toString(2)},
      ${registers[1].toString(2)},
      ${registers[2].toString(2)}`,
    );

    switch (op) {
      case 0: {
        registers[0] = Math.floor(registers[0] / Math.pow(2, getCombo(l)));
        ip += 2;
        break;
      }
      case 1: {
        registers[1] = registers[1] ^ l;
        ip += 2;
        break;
      }
      case 2: {
        registers[1] = getCombo(l) % 8;
        ip += 2;
        break;
      }
      case 3: {
        if (registers[0] !== 0) {
          ip = l;
          break;
        }

        ip += 2;
        break;
      }
      case 4: {
        registers[1] = registers[1] ^ registers[2];
        ip += 2;
        break;
      }
      case 5: {
        const val = getCombo(l) % 8;
        output.push(val);
        console.log(`\n\nOutput: ${val} - ${val.toString(2)}`);
        ip += 2;
        break;
      }
      case 6: {
        registers[1] = Math.floor(registers[0] / Math.pow(2, getCombo(l)));
        ip += 2;
        break;
      }
      case 7: {
        registers[2] = Math.floor(registers[0] / Math.pow(2, getCombo(l)));
        ip += 2;
        break;
      }
      default: {
        throw "noooooo";
      }
    }
    console.log(
      `After instruction\nIP: ${ip}\nRegisters:
      ${registers[0].toString(2)}
      ${registers[1].toString(2)}
      ${registers[2].toString(2)}\n\n`,
    );
  }

  console.log(registers, output);
  // solution here
  return output.join(",") as unknown as number;
};

const run = (input: string, n: number): number[] => {
  const [regs, prog] = sections(input);

  const registers = lineify(regs).flatMap((x) => intify(x));
  const program = intify(prog);

  const instructions = program.slice();

  const getCombo = (a: number) => {
    if (a < 4) {
      return a;
    }
    if (a === 4) return registers[0];
    if (a === 5) return registers[1];
    if (a === 6) return registers[2];

    throw "No register";
  };

  let ip = 0;
  let output: number[] = [];
  let count = 0;

  registers[0] = n;

  while (ip < instructions.length) {
    const op = instructions[ip];
    const l = instructions[ip + 1];
    if (op === 2) {
      console.log(`Start loop A: ${registers[0].toString(8)}`);
    }

    switch (op) {
      case 0: {
        registers[0] = Math.floor(registers[0] / Math.pow(2, getCombo(l)));
        ip += 2;
        break;
      }
      case 1: {
        registers[1] = registers[1] ^ l;
        ip += 2;
        break;
      }
      case 2: {
        registers[1] = getCombo(l) % 8;
        ip += 2;
        break;
      }
      case 3: {
        if (registers[0] !== 0) {
          ip = l;
          break;
        }

        ip += 2;
        break;
      }
      case 4: {
        registers[1] = registers[1] ^ registers[2];
        ip += 2;
        break;
      }
      case 5: {
        console.log(
          `${registers[0].toString(8)} -- ${(getCombo(l) % 8).toString(8)}`,
        );
        const val = getCombo(l) % 8;
        output.push(val);
        ip += 2;
        break;
      }
      case 6: {
        registers[1] = Math.floor(registers[0] / Math.pow(2, getCombo(l)));
        ip += 2;
        break;
      }
      case 7: {
        registers[2] = Math.floor(registers[0] / Math.pow(2, getCombo(l)));
        console.log(`Register C:   ${registers[2].toString(8)}`);
        ip += 2;
        break;
      }
      default: {
        throw "noooooo";
      }
    }
  }

  return output;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const [_regs, prog] = sections(input);

  run(input, 76070001);

  return 0;
};
