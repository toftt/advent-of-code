import {
  sum,
  lineify,
  readInput,
  zip,
  parseInts,
  sections,
  findIndex,
} from "~utils";

type Board = string[][];

const hasBingo = (board: Board) => {
  return (
    board.some((row) => row.every((num) => num === "#")) ||
    zip(...board).some((col) => col.every((num) => num === "#"))
  );
};

const unmarkedSum = (board: Board) => {
  return sum(parseInts(board.flat().filter((num) => num !== "#")));
};

const mark = (board: Board, number: string) => {
  const pos = findIndex(board, number);
  if (pos) {
    board[pos[0]][pos[1]] = "#";
  }
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const inputSections = sections(input);

  const drawNumbers = inputSections[0].split(",");
  const boards: Board[] = inputSections.slice(1).map((boardString) => {
    return lineify(boardString).map((num) =>
      num.split(" ").filter((num) => num !== "")
    );
  });

  for (const number of drawNumbers) {
    for (const board of boards) {
      mark(board, number);
      if (hasBingo(board)) return unmarkedSum(board) * parseInt(number);
    }
  }

  throw new Error("Couldn't find a winning board.");
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const inputSections = sections(input);

  const drawNumbers = inputSections[0].split(",");
  const boards: Board[] = inputSections.slice(1).map((boardString) => {
    return lineify(boardString).map((num) =>
      num.split(" ").filter((num) => num !== "")
    );
  });

  const winners = new Set<Board>();

  for (const number of drawNumbers) {
    for (const board of boards) {
      if (winners.has(board)) continue;

      mark(board, number);

      if (hasBingo(board)) {
        winners.add(board);

        if (winners.size === boards.length) {
          return unmarkedSum(board) * parseInt(number);
        }
      }
    }
  }

  throw new Error("Couldn't find a winning board.");
};
