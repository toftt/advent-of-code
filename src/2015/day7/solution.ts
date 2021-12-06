import { lineify, readInput } from "~utils";

const imm = /^(\w+) -> (\w+)$/;
const binOp = /^(\w+) (\w+) (\w+) -> (\w+)$/;
const unOp = /^(\w+) (\w+) -> (\w+)$/;

type Operator = "AND" | "OR" | "RSHIFT" | "LSHIFT";
type ImmOrRegister = string;
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

type Instruction = {
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
      src: { type: "unOp", src: match[2] },
      dst: match[3],
    };
  }
  throw new Error();
};

const isNumber = (s: string) => /^\d+$/.test(s);

const cache = new Map<Register, number>();
const getSource = (m: Map<Register, Source>, r: Register): number => {
  if (isNumber(r)) return parseInt(r);
  if (cache.has(r)) {
    return cache.get(r)!;
  }

  const src = m.get(r)!;

  let result: number | null = null;

  switch (src.type) {
    case "imm": {
      result = getSource(m, src.value);
      break;
    }
    case "binOp": {
      const lhs = getSource(m, src.lhs);
      const rhs = getSource(m, src.rhs);

      if (src.op === "AND") result = lhs & rhs;
      if (src.op === "OR") result = lhs | rhs;
      if (src.op === "LSHIFT") result = lhs << rhs;
      if (src.op === "RSHIFT") result = lhs >> rhs;
      break;
    }
    case "unOp": {
      const val = getSource(m, src.src);
      result = ~val;
      break;
    }

    default: {
      throw new Error("invalid type");
    }
  }
  if (result !== null) {
    cache.set(r, result);
    return result;
  } else {
    console.log(r);
    throw new Error("no result");
  }
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);
  const instructions = lines.map(parseInstruction);

  const m = new Map<Register, Source>();

  instructions.forEach((ins) => {
    m.set(ins.dst, ins.src);
  });

  return getSource(m, "a") & 0xffff;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);
  const instructions = lines.map(parseInstruction);

  const m = new Map<Register, Source>();

  instructions.forEach((ins) => {
    m.set(ins.dst, ins.src);
  });

  const aSignal = getSource(m, "a") & 0xffff;

  m.set("b", { type: "imm", value: aSignal.toString() });
  cache.clear();

  return getSource(m, "a") & 0xffff;
};
