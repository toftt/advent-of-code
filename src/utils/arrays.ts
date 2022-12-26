export const last = <T>(array: T[]) => {
  return array[array.length - 1];
};

export const enumerate = <T>(it: Iterable<T>) => {
  let idx = 0;
  return (function* () {
    for (const item of it) {
      yield [item, idx++] as const;
    }
  })();
};
