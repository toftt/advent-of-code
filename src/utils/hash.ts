import { zip } from "./lists";

const FNV_OFFSET_BASIS_32 = 0x811c9dc5;
const FNV_PRIME_32 = 0x01000193;

const ENCODER = new TextEncoder();

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

  public write(v: any) {
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

        for (const key of Reflect.ownKeys(v)) {
          this.write((v as any)[key]);
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

export function makeHash(...values: any[]) {
  const hasher = new Hasher();
  for (const value of values) {
    hasher.write(value);
  }
  return hasher.finish();
}

const equals = <T>(a: T, b: T): boolean => {
  if (typeof a === "object") {
    if (a === null || b === null) {
      return a === b;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      return zip(a, b).every(([a, b]) => equals(a, b));
    }

    return Reflect.ownKeys(a).every((k) =>
      equals((a as any)[k], (b as any)[k]),
    );
  }

  return a === b;
};

export class HashSet<T> {
  private storage = new Map<number, T[]>();
  private _size = 0;
  private hashFn: (value: T) => number = makeHash;
  private equalsFn: (a: T, b: T) => boolean = equals;

  constructor(
    hashFn: (value: T) => number = makeHash,
    equalsFn: (a: T, b: T) => boolean = equals,
  ) {
    this.hashFn = hashFn;
    this.equalsFn = equalsFn;
  }

  public add(toInsert: T) {
    const hash = this.hashFn(toInsert);
    if (!this.storage.has(hash)) {
      this.storage.set(hash, []);
    }
    const bucket = this.storage.get(hash)!;
    if (bucket.findIndex((value) => this.equalsFn(toInsert, value)) === -1) {
      bucket.push(toInsert);
      this._size++;
    }
    return this;
  }

  public has(value: T): boolean {
    const hash = this.hashFn(value);
    if (!this.storage.has(hash)) {
      return false;
    }
    const bucket = this.storage.get(hash)!;
    return bucket.findIndex((cand) => this.equalsFn(cand, value)) !== -1;
  }

  public get size(): number {
    return this._size;
  }

  clear(): void {
    this.storage.clear();
    this._size = 0;
  }

  delete(value: T): boolean {
    const hash = this.hashFn(value);
    if (!this.storage.has(hash)) {
      return false;
    }

    const arr = this.storage.get(hash)!;
    const idx = arr.findIndex((v) => this.equalsFn(value, v));
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

export class HashMap<K, V> {
  private storage = new Map<number, { k: K; v: V }[]>();
  private _size = 0;
  private hashFn: (value: K) => number = makeHash;
  private equalsFn: (a: K, b: K) => boolean = equals;

  constructor(
    hashFn: (value: K) => number = makeHash,
    equalsFn: (a: K, b: K) => boolean = equals,
  ) {
    this.hashFn = hashFn;
    this.equalsFn = equalsFn;
  }

  public get(key: K): V | undefined {
    const hash = this.hashFn(key);
    if (!this.storage.has(hash)) {
      return undefined;
    }
    const bucket = this.storage.get(hash)!;
    const idx = bucket.findIndex((cand) => this.equalsFn(cand.k, key));

    return idx !== -1 ? bucket[idx].v : undefined;
  }

  public set(keyToInsert: K, valueToInsert: V) {
    const hash = this.hashFn(keyToInsert);
    if (!this.storage.has(hash)) {
      this.storage.set(hash, []);
    }
    const bucket = this.storage.get(hash)!;
    if (
      bucket.findIndex((value) => this.equalsFn(keyToInsert, value.k)) === -1
    ) {
      bucket.push({ k: keyToInsert, v: valueToInsert });
      this._size++;
    }
    return this;
  }

  public has(key: K): boolean {
    const hash = this.hashFn(key);
    if (!this.storage.has(hash)) {
      return false;
    }
    const bucket = this.storage.get(hash)!;
    return bucket.findIndex((cand) => this.equalsFn(cand.k, key)) !== -1;
  }

  public get size(): number {
    return this._size;
  }

  clear(): void {
    this.storage.clear();
    this._size = 0;
  }

  delete(key: K): boolean {
    const hash = this.hashFn(key);
    if (!this.storage.has(hash)) {
      return false;
    }

    const arr = this.storage.get(hash)!;
    const idx = arr.findIndex((v) => this.equalsFn(key, v.k));
    if (idx !== -1) {
      arr.splice(idx, 1);
      this._size--;
      return true;
    }

    return false;
  }

  *keys(): Iterable<K> {
    for (const value of this.storage.values()) {
      for (const { k } of value) {
        yield k;
      }
    }
  }

  *values(): Iterable<V> {
    for (const value of this.storage.values()) {
      for (const { v } of value) {
        yield v;
      }
    }
  }

  *entries(): Iterable<[K, V]> {
    for (const value of this.storage.values()) {
      for (const { k, v } of value) {
        yield [k, v];
      }
    }
  }
}
