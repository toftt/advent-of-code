import { readInput } from "~utils";

interface FightState {
  playerHp: number;
  playerMana: number;
  bossHp: number;
  bossDmg: number;
  shield: number;
  poison: number;
  recharge: number;
  cost: number;
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

const bossAction = (state: FightState) => {
  const playerArmor = state.shield > 0 ? 7 : 0;
  const damage = Math.max(state.bossDmg - playerArmor, 1);
};

const getNextStates = (state: FightState): any => {
  // FightState => {
  const nextStates: FightState[] = [];
  const preTurnState = cloneState(state);

  // player pre-turn
  if (state.poison > 0) {
    state.bossHp -= 3;
  }

  if (state.recharge > 0) {
    state.playerMana += 101;
  }

  state.shield--;
  state.poison--;
  state.recharge--;

  // player actions
  if (state.recharge <= 0) {
    const state = cloneState(preTurnState);

    state.recharge = 5;
    state.cost += 229;
  }
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  // solution here
  return 0;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  // solution here
  return 0;
};
