import { allCombinations, lineify, oneFromEach, readInput } from "~utils";

const weapons: Item[] = [
  { cost: 8, damage: 4, armor: 0 },
  { cost: 10, damage: 5, armor: 0 },
  { cost: 25, damage: 6, armor: 0 },
  { cost: 40, damage: 7, armor: 0 },
  { cost: 74, damage: 8, armor: 0 },
];
const armors: Item[] = [
  { cost: 13, damage: 0, armor: 1 },
  { cost: 31, damage: 0, armor: 2 },
  { cost: 53, damage: 0, armor: 3 },
  { cost: 75, damage: 0, armor: 4 },
  { cost: 102, damage: 0, armor: 5 },
];
const rings: Item[] = [
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

interface Actor {
  hp: number;
  damage: number;
  armor: number;
}

const mergeItems = (a: Item, b: Item) => ({
  cost: a.cost + b.cost,
  damage: a.damage + b.damage,
  armor: a.armor + b.armor,
});

const ringCombinations = allCombinations(rings, 2).map((combo) =>
  combo.reduce((acc, item) => mergeItems(acc, item), {
    cost: 0,
    damage: 0,
    armor: 0,
  })
);

const armorCombinations = [...armors, { cost: 0, damage: 0, armor: 0 }];
const weaponCombinations = weapons;

const equipmentCombinations = oneFromEach(
  ringCombinations,
  armorCombinations,
  weaponCombinations
).map((combo) =>
  combo.reduce((acc, item) => mergeItems(acc, item), {
    cost: 0,
    damage: 0,
    armor: 0,
  })
);

const willWinFight = (player: Actor, boss: Actor) => {
  const playerDmgPerTurn = Math.max(player.damage - boss.armor, 1);
  const bossDmgPerTurn = Math.max(boss.damage - player.armor, 1);

  const playerKills = Math.ceil(boss.hp / playerDmgPerTurn);
  const bossKills = Math.ceil(player.hp / bossDmgPerTurn);

  return playerKills <= bossKills;
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);

  const hp = parseInt(lines[0].split(" ")[2]);
  const damage = parseInt(lines[1].split(" ")[1]);
  const armor = parseInt(lines[2].split(" ")[1]);

  const boss = {
    hp,
    damage,
    armor,
  };

  equipmentCombinations.sort((a, b) => a.cost - b.cost);

  const winningCombos = equipmentCombinations.filter((equ) =>
    willWinFight({ hp: 100, damage: equ.damage, armor: equ.armor }, boss)
  );

  return winningCombos[0].cost;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);

  const hp = parseInt(lines[0].split(" ")[2]);
  const damage = parseInt(lines[1].split(" ")[1]);
  const armor = parseInt(lines[2].split(" ")[1]);

  const boss = {
    hp,
    damage,
    armor,
  };

  equipmentCombinations.sort((a, b) => b.cost - a.cost);

  const losingCombos = equipmentCombinations.filter(
    (equ) =>
      !willWinFight({ hp: 100, damage: equ.damage, armor: equ.armor }, boss)
  );

  return losingCombos[0].cost;
};
