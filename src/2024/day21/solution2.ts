import {
  Direction,
  HashMap,
  HashSet,
  intify,
  lineify,
  makeHash,
  move,
  Position,
  readInput,
  SparseGridV2,
} from "~utils";

class OffsetQueue<T> {
  private _store: T[];
  private _offset: number;

  constructor() {
    this._store = [];
    this._offset = 0;
  }

  enqueue(item: T) {
    this._store.push(item);
  }

  dequeue(): T | undefined {
    if (this.size() === 0) return undefined;
    const item = this._store[this._offset];
    this._offset++;

    // Compact the store array occasionally
    if (this._offset * 2 >= this._store.length) {
      this._store = this._store.slice(this._offset);
      this._offset = 0;
    }
    return item;
  }

  size(): number {
    return this._store.length - this._offset;
  }
}

const numericKeyPad = SparseGridV2.fromString2("789\n456\n123\n.0A".trim());
const directionalKeyPad = SparseGridV2.fromString2(".^A\n<v>".trim());

type ButtonPress = "A" | "^" | "<" | "v" | ">";

interface RobotState {
  readonly buttonPresses: ButtonPress[];
  readonly position: Position;
  readonly grid: SparseGridV2<string>;
  nextRobot?: RobotState;
}

interface State {
  buttonPresses: ButtonPress[];
  robot: RobotState;
  output: string;
}

const BUTTON_PRESSES: ButtonPress[] = ["A", "^", "<", "v", ">"];

const robotStateIsValid = (rs: RobotState | undefined) => {
  if (!rs) return true;

  const cur = rs.grid.get(rs.position);
  if (!cur || cur === ".") {
    return false;
  }

  return robotStateIsValid(rs.nextRobot);
};

const cache: HashMap<
  { buttonPress: ButtonPress; s: RobotState },
  { s: RobotState; out: string | undefined }
> = new HashMap(
  (o) => makeHash(...getRobotStatePositions(o.s), o.buttonPress),
  (a, b) => a.buttonPress === b.buttonPress && robotStateEquals(a.s, b.s),
);

const robotPressButton = (
  b: ButtonPress,
  r: RobotState,
): [RobotState, string | undefined] => {
  const cur = r.grid.get(r.position);
  if (!cur || cur === ".") {
    throw "robot in bad state";
  }
  const cached = cache.get({ buttonPress: b, s: r });
  if (cached) return [cached.s, cached.out];

  let newR: ReturnType<typeof robotPressButton>;

  switch (b) {
    case "A": {
      if (r.nextRobot) {
        const v = robotPressButton(
          r.grid.get(r.position)! as ButtonPress,
          r.nextRobot,
        );
        const rs: RobotState = {
          grid: r.grid,
          position: { ...r.position },
          buttonPresses: [],
          nextRobot: v[0],
        };
        newR = [rs, v[1]];
      } else {
        const rs: RobotState = {
          grid: r.grid,
          position: { ...r.position },
          buttonPresses: [],
        };
        return [rs, r.grid.get(r.position)!];
      }
      break;
    }
    case "^": {
      const rs: RobotState = {
        grid: r.grid,
        position: move(r.position, Direction.N),
        buttonPresses: [],
        nextRobot: r.nextRobot ? cloneRobotState(r.nextRobot) : undefined,
      };
      newR = [rs, undefined];
      break;
    }
    case "<": {
      const rs: RobotState = {
        grid: r.grid,
        position: move(r.position, Direction.W),
        buttonPresses: [],
        nextRobot: r.nextRobot ? cloneRobotState(r.nextRobot) : undefined,
      };
      newR = [rs, undefined];
      break;
    }
    case "v": {
      const rs: RobotState = {
        grid: r.grid,
        position: move(r.position, Direction.S),
        buttonPresses: [],
        nextRobot: r.nextRobot ? cloneRobotState(r.nextRobot) : undefined,
      };
      newR = [rs, undefined];
      break;
    }
    case ">": {
      const rs: RobotState = {
        grid: r.grid,
        position: move(r.position, Direction.E),
        buttonPresses: [],
        nextRobot: r.nextRobot ? cloneRobotState(r.nextRobot) : undefined,
      };
      newR = [rs, undefined];
      break;
    }
  }

  cache.set(
    { buttonPress: b, s: r },
    {
      s: cloneRobotState(newR[0]),
      out: newR[1],
    },
  );
  return newR;
};

const pressButton = (b: ButtonPress, s: State) => {
  s.buttonPresses.push(b);
  let output: string | undefined;

  switch (b) {
    case "A": {
      const [rs, o] = robotPressButton(b, s.robot);
      output = o;
      s.robot = rs;
      break;
    }
    case "^": {
      const [rs, o] = robotPressButton(b, s.robot);
      output = o;
      s.robot = rs;
      break;
    }
    case "<": {
      const [rs, o] = robotPressButton(b, s.robot);
      output = o;
      s.robot = rs;
      break;
    }
    case "v": {
      const [rs, o] = robotPressButton(b, s.robot);
      output = o;
      s.robot = rs;
      break;
    }
    case ">": {
      const [rs, o] = robotPressButton(b, s.robot);
      output = o;
      s.robot = rs;
      break;
    }
  }

  if (output) {
    s.output += output;
  }
};

// const clearRobotButtonPresses = (s: RobotState): void => {
//   let next: RobotState | undefined = s;

//   while (next) {
//     next.buttonPresses = [];
//     next = next.nextRobot;
//   }
// };

const cloneRobotState = (s: RobotState): RobotState => {
  return {
    buttonPresses: [...s.buttonPresses],
    position: { ...s.position },
    grid: s.grid,
    nextRobot: s.nextRobot ? cloneRobotState(s.nextRobot) : undefined,
  };
};
const cloneState = (s: State): State => {
  return {
    buttonPresses: [...s.buttonPresses],
    robot: cloneRobotState(s.robot),
    output: s.output,
  };
};

const printRobotState = (s: RobotState) => {
  console.log(`pos: ${JSON.stringify(s.position, undefined, 2)}`);
  console.log(`buttonPresses (${s.buttonPresses.length}): ${s.buttonPresses}`);
  if (s.nextRobot) {
    console.log(`next:`);
    printRobotState(s.nextRobot);
  }
};

const printState = (s: State) => {
  console.log("#############");
  console.log("b", s.buttonPresses);
  console.log("o", s.output);
  printRobotState(s.robot);
  console.log("#############");
};

const hashState = (s: State) => {
  const values: Position[] = [];

  let r: RobotState | undefined = s.robot;

  while (r) {
    values.push(r.position);
    r = r.nextRobot;
  }

  return makeHash(...values, s.output);
};

const getStatePositions = (s: State) => {
  return getRobotStatePositions(s.robot);
};

const getRobotStatePositions = (s: RobotState) => {
  const values: Position[] = [];

  let r: RobotState | undefined = s;

  while (r) {
    values.push(r.position);
    r = r.nextRobot;
  }

  return values;
};

const robotStateEquals = (a: RobotState, b: RobotState) => {
  const valuesA = getRobotStatePositions(a);
  const valuesB = getRobotStatePositions(b);

  for (let i = 0; i < valuesA.length; i++) {
    const vA = valuesA[i];
    const vB = valuesB[i];

    if (vA.x !== vB.x || vA.y !== vB.y) {
      return false;
    }
  }

  return true;
};

const stateEquals = (a: State, b: State) => {
  const valuesA = getStatePositions(a);
  const valuesB = getStatePositions(b);

  for (let i = 0; i < valuesA.length; i++) {
    const vA = valuesA[i];
    const vB = valuesB[i];

    if (vA.x !== vB.x || vA.y !== vB.y) {
      return false;
    }
  }

  return true;
};

export const part1 = (useTestData: boolean = false): number => {
  return 0;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const codes = lineify(input);

  const numericInputs = new Map<string, Position>();
  const directionalInputs = new Map<string, Position>();

  for (const [pos, input] of numericKeyPad.entries()) {
    numericInputs.set(input, pos);
  }

  for (const [pos, input] of directionalKeyPad.entries()) {
    directionalInputs.set(input, pos);
  }

  const robot: RobotState = {
    buttonPresses: [],
    position: { ...directionalInputs.get("A")! },
    grid: directionalKeyPad,
  };

  let nextRob = robot;

  for (let i = 0; i < 24; i++) {
    nextRob.nextRobot = {
      buttonPresses: [],
      position: { ...directionalInputs.get("A")! },
      grid: directionalKeyPad,
    };
    nextRob = nextRob.nextRobot;
  }

  nextRob.nextRobot = {
    buttonPresses: [],
    position: { ...numericInputs.get("A")! },
    grid: numericKeyPad,
  };

  const initialState: State = {
    buttonPresses: [],
    robot,
    output: "",
  };

  let result: [string, string[]][] = [];

  for (const code of codes) {
    let subResult: string[][] = [];
    let lastState = initialState;

    for (const subCode of code.split("")) {
      const seen = new HashSet(hashState, stateEquals);
      const best = new Map<number, number>();
      const queue = new OffsetQueue<State>();
      queue.enqueue(lastState);

      let count = 0;
      while (queue.size() > 0) {
        const state = queue.dequeue()!;
        if (count++ % 10_000 === 0) {
          console.log(`queue size: ${queue.size()}`);
          console.log(`seen size: ${seen.size}`);
          console.log(`output: ${state.output}`);
          console.log(`button len: ${state.buttonPresses.length}`);
          console.log(`subCode: ${subCode}`);
          console.log(`cache size: ${cache.size}`);
        }

        seen.add(state);
        best.set(
          state.buttonPresses.length,
          Math.max(
            best.get(state.buttonPresses.length) || 0,
            state.output.length,
          ),
        );

        if (state.output === subCode) {
          // console.log(state.output);
          subResult.push(state.buttonPresses);
          const nState = cloneState(state);
          // clearRobotButtonPresses(nState.robot);
          nState.buttonPresses = [];
          nState.output = "";
          lastState = nState;
          break;
        }

        for (const bp of BUTTON_PRESSES) {
          const clonedState = cloneState(state);
          try {
            pressButton(bp, clonedState);

            if (seen.has(clonedState)) continue;

            if (!robotStateIsValid(clonedState.robot)) {
              seen.add(clonedState);
              continue;
            }

            if (
              (best.get(clonedState.buttonPresses.length) || 0) >
              clonedState.output.length
            ) {
              seen.add(clonedState);
              continue;
            }

            if (!subCode.startsWith(clonedState.output)) {
              seen.add(clonedState);
              continue;
            }

            queue.enqueue(clonedState);
          } catch (e) {
            continue;
          }
        }
      }
    }

    // console.log({ subResult });
    result.push([code, subResult.flat()]);
  }

  console.log(result);
  console.log(result[0][1].join(""));

  let total = 0;
  for (const [a, b] of result) {
    const numericPart = parseInt(intify(a).join(""));
    total += numericPart * b.length;
  }

  return total;
};
