export const last = <T>(array: T[]) => {
  return array[array.length - 1];
};

export const enumerate = <T>(
  it: Iterable<T>
): Iterable<readonly [T, number]> => {
  const iterator = it[Symbol.iterator]();

  const enumeratedIterator: Iterator<readonly [T, number]> & {
    currentIndex: number;
  } & Iterable<readonly [T, number]> = {
    [Symbol.iterator]() {
      return this;
    },
    currentIndex: 0,
    next() {
      const { value, done } = iterator.next();
      if (done) return { done, value: undefined };
      const result: IteratorYieldResult<readonly [T, number]> = {
        value: <const>[value, this.currentIndex++],
        done: false,
      };
      return result;
    },
  };

  return enumeratedIterator;
};
