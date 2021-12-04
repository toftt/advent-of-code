import { lineify, PriorityQueue, readInput } from "~utils";

interface FightState {
  playerHp: number;
  playerMana: number;
  bossHp: number;
  bossDmg: number;
  shield: number;
  poison: number;
  recharge: number;
  cost: number;
  hasWon: boolean;
  history: FightState[];
}

const cloneState = (state: FightState) => ({ ...state });
const PLAYER_MAX_HP = 50;

const applyStartOfTurnEffects = (state: FightState) => {
  if (state.poison > 0) {
    state.bossHp -= 3;
  }

  if (state.recharge > 0) {
    state.playerMana += 101;
  }

  state.shield--;
  state.poison--;
  state.recharge--;
};

const bossDamage = (state: FightState) => {
  const playerArmor = state.shield > 0 ? 7 : 0;
  return Math.max(state.bossDmg - playerArmor, 1);
};

const applyBossTurn = (state: FightState) => {
  applyStartOfTurnEffects(state);
  if (state.bossHp <= 0) {
    state.hasWon = true;
  } else {
    state.playerHp -= bossDamage(state);
  }
};

const hasLost = (state: FightState) => {
  return !state.hasWon && (state.playerMana < 53 || state.playerHp <= 0);
};

const getNextStates = (state: FightState): FightState[] => {
  // FightState => {
  const nextStates: FightState[] = [];
  const preTurnState = cloneState(state);

  applyStartOfTurnEffects(preTurnState);

  // player actions
  if (preTurnState.recharge <= 0 && preTurnState.playerMana >= 229) {
    const state = cloneState(preTurnState);

    state.recharge = 5;
    state.playerMana -= 229;
    state.cost += 229;

    applyBossTurn(state);
    nextStates.push(state);
  }

  if (preTurnState.poison <= 0 && preTurnState.playerMana >= 173) {
    const state = cloneState(preTurnState);

    state.poison = 6;
    state.playerMana -= 173;
    state.cost += 173;

    applyBossTurn(state);
    nextStates.push(state);
  }

  if (preTurnState.shield <= 0 && preTurnState.playerMana >= 113) {
    const state = cloneState(preTurnState);

    state.shield = 6;
    state.playerMana -= 113;
    state.cost += 113;

    applyBossTurn(state);
    nextStates.push(state);
  }

  if (preTurnState.playerMana >= 53) {
    const state = cloneState(preTurnState);

    state.bossHp -= 4;
    state.playerMana -= 53;
    state.cost += 53;

    applyBossTurn(state);
    nextStates.push(state);
  }

  if (preTurnState.playerMana >= 73) {
    const state = cloneState(preTurnState);

    state.bossHp -= 2;
    state.playerHp += 2;
    state.playerMana -= 73;
    state.cost += 73;

    applyBossTurn(state);
    nextStates.push(state);
  }

  return nextStates;
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);

  const hp = parseInt(lines[0].split(" ")[2]);
  const damage = parseInt(lines[1].split(" ")[1]);

  const initialState: FightState = {
    playerHp: 50,
    playerMana: 500,
    bossHp: hp,
    bossDmg: damage,
    shield: 0,
    poison: 0,
    recharge: 0,
    cost: 0,
    hasWon: false,
    history: [],
  };

  const queue = new PriorityQueue([initialState], (a, b) => a.cost < b.cost);

  const seenStates = new Set();
  seenStates.add(JSON.stringify(initialState));

  let winningState: FightState | null = null;

  while (!queue.isEmpty()) {
    const state = queue.pop();
    if (state.hasWon) {
      winningState = state;
      break;
    }

    const nextStates = getNextStates(state)
      .filter((s) => !hasLost(s))
      .filter((s) => !seenStates.has(JSON.stringify(s)));

    nextStates.forEach((s) => {
      queue.push(s);
      seenStates.add(JSON.stringify(s));
    });
  }

  if (!winningState) throw new Error("no solution");

  return winningState.cost;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);

  const hp = parseInt(lines[0].split(" ")[2]);
  const damage = parseInt(lines[1].split(" ")[1]);

  const initialState: FightState = {
    playerHp: 50,
    playerMana: 500,
    bossHp: hp,
    bossDmg: damage,
    shield: 0,
    poison: 0,
    recharge: 0,
    cost: 0,
    hasWon: false,
    history: [],
  };

  const queue = new PriorityQueue([initialState], (a, b) => a.cost < b.cost);

  const seenStates = new Set();
  seenStates.add(JSON.stringify(initialState));

  let winningState: FightState | null = null;

  while (!queue.isEmpty()) {
    const state = queue.pop();
    if (state.hasWon) {
      winningState = state;
      break;
    }

    const nextStates = getNextStates(state)
      .map((s) => {
        s.playerHp -= 1;
        return s;
      })
      .filter((s) => !hasLost(s))
      .filter((s) => !seenStates.has(JSON.stringify(s)));

    nextStates.forEach((s) => {
      queue.push(s);
      seenStates.add(JSON.stringify(s));
    });
  }

  if (!winningState) throw new Error("no solution");

  return winningState.cost;
};
