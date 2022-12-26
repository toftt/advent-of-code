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

export const partition = <T>(it: Iterable<T>, size: number) => {
  return (function* () {
    let current = [];
    for (const item of it) {
      current.push(item);
      if (current.length === size) {
        yield current;
        current = [];
      }
    }
    if (current.length !== 0) return current;
  })();
};
