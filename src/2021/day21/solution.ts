import {
  add,
  Counter,
  lineify,
  oneFromEach,
  readInput,
  StringifiedSet,
  sum,
} from "~utils";

function* createDie() {
  let num = 1;
  while (true) {
    yield num;
    num += 1;
    if (num > 100) num = 1;
  }
}

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const [p1StartPos, p2StartPos] = lineify(input).map((x) =>
    parseInt(x.split(": ")[1])
  );

  const p1 = { pos: p1StartPos - 1, score: 0 };
  const p2 = { pos: p2StartPos - 1, score: 0 };

  const die = createDie();

  let p1ToThrow = true;
  let dieThrows = 0;
  while (p1.score < 1000 && p2.score < 1000) {
    const val = [
      die.next().value!,
      die.next().value!,
      die.next().value!,
    ].reduce(add, 0);
    if (p1ToThrow) {
      p1.pos = (p1.pos + val) % 10;
      p1.score += p1.pos + 1;
    } else {
      p2.pos = (p2.pos + val) % 10;
      p2.score += p2.pos + 1;
    }
    dieThrows += 3;
    p1ToThrow = !p1ToThrow;
  }

  const losingPlayer = p1.score < 1000 ? p1 : p2;

  console.log({ p1, p2, turn: dieThrows });
  return losingPlayer.score * dieThrows;
};

interface GameState {
  p1: { pos: number; score: number };
  p2: { pos: number; score: number };
  p1ToThrow: boolean;
}

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const [p1StartPos, p2StartPos] = lineify(input).map((x) =>
    parseInt(x.split(": ")[1])
  );

  const p1 = { pos: p1StartPos - 1, score: 0 };
  const p2 = { pos: p2StartPos - 1, score: 0 };

  const initialState: GameState = { p1, p2, p1ToThrow: true };

  const gameStates = new Map<string, number>();
  const get = (g: GameState) => gameStates.get(JSON.stringify(g));
  const set = (g: GameState, count: number) =>
    gameStates.set(JSON.stringify(g), count);
  const remove = (g: GameState) => gameStates.delete(JSON.stringify(g));
  const entries = (): [GameState, number][] =>
    [...gameStates.entries()].map(([k, v]) => [JSON.parse(k), v]);

  const diceCombinations = new Counter(
    oneFromEach([1, 2, 3], [1, 2, 3], [1, 2, 3]).map((ds) => sum(ds))
  );
  set(initialState, 1);
  while (true) {
    const ongoingGames = entries().filter(
      ([s, _c]) => s.p1.score < 21 && s.p2.score < 21
    );
    if (ongoingGames.length === 0) break;

    ongoingGames.forEach(([state, count]) => {
      if (state.p1ToThrow) {
        for (const [diceSum, possibilities] of diceCombinations.entries()) {
          const newPos = (state.p1.pos + diceSum) % 10;
          const newScore = state.p1.score + newPos + 1;
          const newState: GameState = {
            ...state,
            p1: { score: newScore, pos: newPos },
            p1ToThrow: !state.p1ToThrow,
          };

          const existingCount = get(newState) ?? 0;
          set(newState, existingCount + possibilities * count);
        }
      } else {
        for (const [diceSum, possibilities] of diceCombinations.entries()) {
          const newPos = (state.p2.pos + diceSum) % 10;
          const newScore = state.p2.score + newPos + 1;
          const newState: GameState = {
            ...state,
            p2: { score: newScore, pos: newPos },
            p1ToThrow: !state.p1ToThrow,
          };

          const existingCount = get(newState) ?? 0;
          set(newState, existingCount + possibilities * count);
        }
      }
      remove(state);
    });
  }

  const player1Wins = entries()
    .filter(([s]) => s.p1.score >= 21)
    .reduce((acc, [_s, v]) => acc + v, 0);
  const player2Wins = entries()
    .filter(([s]) => s.p2.score >= 21)
    .reduce((acc, [_s, v]) => acc + v, 0);

  return Math.max(player1Wins, player2Wins);
};
