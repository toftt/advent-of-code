export class Counter<T> extends Map<T, number> {
  constructor(iterable?: Iterable<T>) {
    super();

    if (iterable) {
      for (const element of iterable) {
        this.add(element);
      }
    }
  }

  public add(element: T) {
    if (this.has(element)) {
      this.set(element, this.get(element)! + 1);
    } else {
      this.set(element, 1);
    }
  }

  public mostCommon(): [T, number] {
    const entries = [...this.entries()];
    if (entries.length === 0) throw new Error("no entries");

    let [mostCommon, maxOccurences] = entries[0];

    for (const [element, numOccurences] of entries.slice(1)) {
      if (numOccurences > maxOccurences) {
        [mostCommon, maxOccurences] = [element, numOccurences];
      }
    }

    return [mostCommon, maxOccurences];
  }

  public leastCommon(): [T, number] {
    const entries = [...this.entries()];
    if (entries.length === 0) throw new Error("no entries");

    let [leastCommon, minOccurences] = entries[0];

    for (const [element, numOccurences] of entries.slice(1)) {
      if (numOccurences < minOccurences) {
        [leastCommon, minOccurences] = [element, numOccurences];
      }
    }

    return [leastCommon, minOccurences];
  }
}
