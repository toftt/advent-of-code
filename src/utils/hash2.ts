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
      case "bigint": {
        this.writeNumber(Number(v));
        break;
      }
      case "undefined": {
        this.writeNumber(1822);
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
          this.write(v[key]);
        }
        break;
      }
      default: {
        throw new Error(`Unsupported type { type: ${typeof v}, value: ${v} }`);
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
