export const last = <T>(array: T[]) => {
  return array[array.length - 1];
};

export const first = <T>(array: T[]) => {
  return array[0];
};

export const enumerate = <T>(
  it: Iterable<T>,
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

export function twine<O, M>(array: O[], mappingFn: (el: O) => M): [O, M][] {
  return array.map((el) => [el, mappingFn(el)]);
}

export function namedTwine<O, M, N1 extends string, N2 extends string>(
  array: O[],
  originalName: N1,
  mappedName: N2,
  mappingFunction: (el: O) => M,
): Array<{ [K in N1]: O } & { [K in N2]: M }> {
  return array.map((el) => ({
    [originalName]: el,
    [mappedName]: mappingFunction(el),
  })) as Array<{ [K in N1]: O } & { [K in N2]: M }>;
}
