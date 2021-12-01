import { lineify, readInput } from "~utils";

const imm = /^(\w+) -> (\w+)$/;
const binOp = /^(\w+) (\w+) (\w+) -> (\w+)$/;
const unOp = /^(\w+) (\w+) -> (\w+)$/;

type Operator = "AND" | "OR" | "RSHIFT" | "LSHIFT";
type ImmOrRegister = number | string;
type Register = string;
type Source =
  | {
      type: "imm";
      value: ImmOrRegister;
    }
  | {
      type: "binOp";
      lhs: ImmOrRegister;
      op: Operator;
      rhs: ImmOrRegister;
    }
  | { src: ImmOrRegister; type: "unOp" };
type Instruction =
  | {
      src: Source;
      dst: Register;
    }
  | {
      src: Source;
      dst: Register;
    }
  | {
      // only NOT
      src: Source;
      dst: Register;
    };

const parseInstruction = (s: string): Instruction => {
  let match: ReturnType<string["match"]> = null;
  if ((match = s.match(imm)) !== null) {
    return {
      src: { type: "imm", value: match[1] },
      dst: match[2],
    };
  }

  if ((match = s.match(binOp)) !== null) {
    return {
      src: {
        type: "binOp",
        lhs: match[1],
        op: match[2] as Operator,
        rhs: match[3],
      },
      dst: match[4],
    };
  }

  if ((match = s.match(unOp)) !== null) {
    return {
      src: { type: "unOp", src: match[1] },
      dst: match[2],
    };
  }
  throw new Error();
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);
  const instructions = lines.map(parseInstruction);

  const m = new Map<Register, Source>();

  instructions.forEach((ins) => {
    m.set(ins.dst, ins.src);
  });

  // console.log(m);

  return 0;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  // solution here
  return 0;
};
