const FNV_OFFSET_BASIS_32 = 0x811c9dc5;
const FNV_PRIME_32 = 0x01000193;

const ENCODER = new TextEncoder();

export interface WithHashValues extends Object {
  hashValues(): Iterable<Hashable>;
}

type Hashable = number | string | boolean | WithHashValues | Hashable[];
export class Hasher {
  private hash: number = FNV_OFFSET_BASIS_32;

  private writeNumber(v: number) {
    for (let shift = 0; shift < 32; shift += 8) {
      // interpret as unsigned int, pick 1-4th byte
      const byte = (v >>> shift) & 0xff;
      this.hash ^= byte;
      this.hash = (this.hash * FNV_PRIME_32) >>> 0;
    }
  }

  private writeString(v: string) {
    const byteArray = ENCODER.encode(v);
    for (const byte of byteArray) {
      this.writeNumber(byte);
    }
  }

  private writeBoolean(v: boolean) {
    this.writeNumber(+v);
  }

  public write(v: Hashable) {
    switch (typeof v) {
      case "number": {
        this.writeNumber(v);
        break;
      }
      case "string": {
        this.writeString(v);
        break;
      }
      case "boolean": {
        this.writeBoolean(v);
        break;
      }
      case "object": {
        if (Array.isArray(v)) {
          for (const value of v) {
            this.write(value);
          }
          break;
        }

        for (const value of v.hashValues()) {
          this.write(value);
        }
        break;
      }
      default: {
        throw new Error(`Unsupported type ${typeof v}`);
      }
    }
  }

  public finish(): number {
    return this.hash;
  }
}

export function makeHash(...values: Hashable[]) {
  const hasher = new Hasher();
  for (const value of values) {
    hasher.write(value);
  }
  return hasher.finish();
}

export interface WithEq {
  eq(other: any): boolean;
}

type Eq = number | string | boolean | WithEq;

const equals = (a: Eq, b: Eq) => {
  if (typeof a === "object") {
    return a.eq(b);
  }

  return a === b;
};

export class HashSet<T extends Hashable & Eq> {
  private storage = new Map<number, T[]>();
  private _size = 0;

  public add(toInsert: T) {
    const hash = makeHash(toInsert);
    if (!this.storage.has(hash)) {
      this.storage.set(hash, []);
    }
    const bucket = this.storage.get(hash)!;
    if (bucket.findIndex((value) => equals(toInsert, value)) === -1) {
      bucket.push(toInsert);
      this._size++;
    }
    return this;
  }

  public has(value: T): boolean {
    const hash = makeHash(value);
    if (!this.storage.has(hash)) {
      return false;
    }
    const bucket = this.storage.get(hash)!;
    return bucket.findIndex((cand) => equals(cand, value)) !== -1;
  }

  public get size(): number {
    return this._size;
  }

  clear(): void {
    this.storage.clear();
    this._size = 0;
  }

  delete(value: T): boolean {
    const hash = makeHash(value);
    if (!this.storage.has(hash)) {
      return false;
    }

    const arr = this.storage.get(hash)!;
    const idx = arr.findIndex((v) => equals(value, v));
    if (idx !== -1) {
      arr.splice(idx, 1);
      this._size--;
      return true;
    }

    return false;
  }

  *keys(): Iterable<T> {
    for (const value of this.storage.values()) {
      yield* value;
    }
  }
}
