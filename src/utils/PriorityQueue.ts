type Comparator<T> = (a: T, b: T) => boolean;
export class PriorityQueue<T> {
  readonly elements: T[];
  private readonly takesPriority: Comparator<T>;

  constructor(iterable: Iterable<T>, takePriority: Comparator<T>) {
    this.takesPriority = takePriority;
    this.elements = [];

    for (const element of iterable) {
      this.push(element);
    }
  }

  private upHeap(fromIndex: number) {
    let currentIndex = fromIndex;

    while (currentIndex !== 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);

      const parentEl = this.elements[parentIndex];
      const currentEl = this.elements[currentIndex];

      if (this.takesPriority(currentEl, parentEl)) {
        this.elements[currentIndex] = parentEl;
        this.elements[parentIndex] = currentEl;
      }

      currentIndex = parentIndex;
    }
  }

  public increasePriority(equals: (el: T) => boolean, replacement: T) {
    const index = this.elements.findIndex(equals);
    if (index === -1) throw new Error("couldnt find elem");

    this.elements[index] = replacement;
    this.upHeap(index);
  }

  public push(element: T) {
    const insertionIndex = this.elements.length;
    this.elements.push(element);

    if (insertionIndex === 0) return;

    let currentIndex = insertionIndex;

    while (currentIndex !== 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);

      const parentEl = this.elements[parentIndex];
      const currentEl = this.elements[currentIndex];

      if (this.takesPriority(currentEl, parentEl)) {
        this.elements[currentIndex] = parentEl;
        this.elements[parentIndex] = currentEl;
      }

      currentIndex = parentIndex;
    }
  }

  public pop(): T {
    if (this.isEmpty()) throw new Error("Queue is empty.");
    if (this.elements.length === 1) return this.elements.pop()!;

    const newRoot = this.elements.pop()!;
    const returnValue = this.elements[0];

    this.elements[0] = newRoot;

    let i = 0;
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      let largest = i;

      if (
        left < this.elements.length &&
        this.takesPriority(this.elements[left], this.elements[largest])
      ) {
        largest = left;
      }

      if (
        right < this.elements.length &&
        this.takesPriority(this.elements[right], this.elements[largest])
      ) {
        largest = right;
      }

      if (largest === i) {
        break;
      }

      const tmp = this.elements[i];
      this.elements[i] = this.elements[largest];
      this.elements[largest] = tmp;
      i = largest;
    }

    return returnValue;
  }

  public isEmpty() {
    return this.elements.length === 0;
  }
}
