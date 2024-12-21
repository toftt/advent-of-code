import {
  CARDINAL_DIRECTIONS,
  Direction,
  HashMap,
  HashSet,
  intify,
  lineify,
  makeHash,
  manhattanDistance,
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

const numericInputs = new Map<string, Position>();
const directionalInputs = new Map<string, Position>();

for (const [pos, input] of numericKeyPad.entries()) {
  numericInputs.set(input, pos);
}

for (const [pos, input] of directionalKeyPad.entries()) {
  directionalInputs.set(input, pos);
}

const keypads = {
  numerical: { keypad: numericKeyPad, reverseMap: numericInputs },
  directional: { keypad: directionalKeyPad, reverseMap: directionalInputs },
};

interface RobotSpec {
  type: keyof typeof keypads;
  currentSymbol: string;
}

type Chain = RobotSpec[];

export const part1 = (useTestData: boolean = false): number => {
  return 0;
};

const DIRECTION_TO_KEY: Record<Direction, "^" | "<" | "v" | ">"> = {
  [Direction.W]: "<",
  [Direction.E]: ">",
  [Direction.S]: "v",
  [Direction.N]: "^",
  [Direction.SW]: "v",
  [Direction.SE]: "v",
  [Direction.NW]: "^",
  [Direction.NE]: "^",
};

const pathCache = new HashMap<
  { from: string; to: string; keypadType: keyof typeof keypads },
  string[][]
>();
export const getPaths = (
  from: string,
  to: string,
  keypadType: keyof typeof keypads,
) => {
  const cacheKey = { from, to, keypadType };
  if (pathCache.has(cacheKey)) {
    return pathCache.get(cacheKey);
  }

  const { keypad, reverseMap } = keypads[keypadType];
  const startPos = reverseMap.get(from)!;
  const endPos = reverseMap.get(to)!;

  const pathLen = manhattanDistance(startPos, endPos);
  const initialPath = { currentPos: startPos, path: [] as string[] };
  const queue = new OffsetQueue<typeof initialPath>();

  queue.enqueue(initialPath);

  const results: string[][] = [];
  while (queue.size() > 0) {
    const { currentPos, path } = queue.dequeue()!;

    if (path.length > pathLen) continue;
    if (currentPos.x === endPos.x && currentPos.y === endPos.y) {
      results.push(path);
      continue;
    }

    for (const direction of CARDINAL_DIRECTIONS) {
      const newPos = move(currentPos, direction);
      const posValue = keypad.get(newPos);
      if (posValue === undefined || posValue === ".") continue;

      queue.enqueue({
        currentPos: newPos,
        path: [...path, DIRECTION_TO_KEY[direction]],
      });
    }
  }

  pathCache.set(cacheKey, results);
  return results;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const codes = lineify(input);

  const specs: RobotSpec[] = [];

  const calculatePressesNeeded = (chain: Chain, symbolsNeeded: string) => {
    if (symbolsNeeded.length === 0) return 0;

    let bestCost = Infinity;
    const currentSymbol = symbolsNeeded[0];
    const currentRobot = chain[0];
  };

  for (const code of codes.slice(1)) {
    for (const character of code.split("").slice(1)) {
      //
    }
  }

  return 0;
};
