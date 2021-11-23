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
}
