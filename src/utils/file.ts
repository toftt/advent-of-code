import callsite from "callsite";
import fs from "fs";
import path from "path";

export const readInput = (test: boolean = false) => {
  const stack = callsite();
  if (stack.length < 2) {
    throw new Error("incorrect call");
  }

  const filePath = stack[1].getFileName();
  const directoryPath = path.dirname(filePath);

  const inputFileName = test ? "test" : "input";
  const inputPath = path.join(directoryPath, inputFileName);

  return fs.readFileSync(inputPath, "utf8");
};
