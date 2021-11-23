type ArrayToUnion<T extends readonly string[]> = T[number];
type UnionToObject<T extends readonly string[], U extends any[]> = {
  [P in ArrayToUnion<T>]: U[number];
};

export const objectify = <T extends readonly string[], U extends any[]>(
  keys: T,
  values: U
): UnionToObject<T, U> => {
  const result: any = {};

  keys.forEach((key, idx) => {
    result[key] = values[idx];
  });

  return result;
};
