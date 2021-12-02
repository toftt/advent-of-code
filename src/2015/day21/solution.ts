import { combinations, lineify, readInput } from "~utils";

const weapons = [
  { cost: 8, damage: 4, armor: 0 },
  { cost: 10, damage: 5, armor: 0 },
  { cost: 25, damage: 6, armor: 0 },
  { cost: 40, damage: 7, armor: 0 },
  { cost: 74, damage: 8, armor: 0 },
];
const armors = [
  { cost: 13, damage: 0, armor: 1 },
  { cost: 31, damage: 0, armor: 2 },
  { cost: 53, damage: 0, armor: 3 },
  { cost: 75, damage: 0, armor: 4 },
  { cost: 102, damage: 0, armor: 5 },
];
const rings = [
  { cost: 25, damage: 1, armor: 0 },
  { cost: 50, damage: 2, armor: 0 },
  { cost: 100, damage: 3, armor: 0 },
  { cost: 20, damage: 0, armor: 1 },
  { cost: 40, damage: 0, armor: 2 },
  { cost: 80, damage: 0, armor: 3 },
];
interface Item {
  cost: number;
  damage: number;
  armor: number;
}

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);

  const hp = parseInt(lines[0].split(" ")[2]);
  const dmg = parseInt(lines[1].split(" ")[1]);
  const armor = parseInt(lines[2].split(" ")[1]);

  console.log({ hp, dmg, armor });
  console.log(combinations(rings, 2));

  // solution here
  return 0;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  // solution here
  return 0;
};
