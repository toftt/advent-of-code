export const sum = (iterable: Iterable<number>) => {
  let result = 0;
  for (const num of iterable) {
    result += num;
  }

  return result;
};

export function add(a: number): (a: number) => number;
export function add(a: number, b: number): number;
export function add(a: number, b?: number) {
  if (b) return a + b;
  return (num: number) => add(num, a);
}

export function mult(a: number): (a: number) => number;
export function mult(a: number, b: number): number;
export function mult(a: number, b?: number) {
  if (b) return a * b;
  return (num: number) => mult(num, a);
}

export function sub(a: number): (a: number) => number;
export function sub(a: number, b: number): number;
export function sub(a: number, b?: number) {
  if (b) return a - b;
  return (num: number) => sub(num, a);
}
