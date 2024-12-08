export const mapValues = <T extends object, K extends keyof T, N>(
  obj: T,
  mapFn: (el: T[K]) => N,
): Record<K, N> => {
  const newObj: Partial<Record<K, N>> = {};
  for (const [a, b] of Object.entries(obj)) {
    newObj[a as K] = mapFn(b);
  }
  return newObj as Record<K, N>;
};
