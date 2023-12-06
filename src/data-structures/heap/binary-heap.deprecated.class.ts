/**
 * @deprecated
 */
export class BinaryHeap<T = number> {
  private heap: T[] = [];
  private compare: Function;

  constructor();

  constructor(compare: Function);

  constructor(values: T[]);

  constructor(values: T[], compare: Function);

  constructor(valuesOrCompare?: T[] | Function, compare?: Function) {
    const defaultCompare: Function = (a: any, b: any) => b - a;
    if (!valuesOrCompare) {
      valuesOrCompare = defaultCompare;
    }
    if (!compare) {
      compare = defaultCompare;
    }
    if (typeof valuesOrCompare === 'function') {
      compare = valuesOrCompare;
    }
    this.compare = compare;
    if (Array.isArray(valuesOrCompare)) {
      this.heapify(valuesOrCompare);
    }
  }

  private parentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private leftIndex(index: number): number {
    return index * 2 + 1;
  }

  private rightIndex(index: number): number {
    return index * 2 + 2;
  }

  private isLessThan(a: T, b: T): boolean {
    if (!a || !b) return false;
    return this.compare(a, b) > 0;
  }

  private swap(source: number, destination: number) {
    [this.heap[source], this.heap[destination]] = [
      this.heap[destination],
      this.heap[source],
    ];
  }

  private swimUp(index: number): number {
    const parentIndex = this.parentIndex(index);
    if (parentIndex < 0) return index;
    const value = this.heap[index];
    const parentValue = this.heap[parentIndex];
    const lessThanParent = this.isLessThan(value, parentValue);
    if (!lessThanParent) return index;
    this.swap(index, parentIndex);
    return this.swimUp(parentIndex);
  }

  private sinkDown(index: number): number {
    const leftIndex = this.leftIndex(index);
    const rightIndex = this.rightIndex(index);
    if (leftIndex >= this.size()) return index;
    const value = this.heap[index];
    const leftValue = this.heap[leftIndex];
    const rightValue = rightIndex < this.size() ? this.heap[rightIndex] : null;
    if (rightValue === null || this.isLessThan(leftValue, rightValue)) {
      const sinkLeft = this.isLessThan(leftValue, value);
      if (!sinkLeft) return index;
      this.swap(index, leftIndex);
      return this.sinkDown(leftIndex);
    } else {
      const sinkRight = this.isLessThan(rightValue, value);
      if (!sinkRight) return index;
      this.swap(index, rightIndex);
      return this.sinkDown(rightIndex);
    }
  }

  size(): number {
    return this.heap.length;
  }

  insert(value: T): number {
    this.heap.push(value);
    return this.swimUp(this.size() - 1);
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  poll(): T | undefined {
    if (this.size() === 0) return undefined;
    this.swap(0, this.size() - 1);
    const value = this.heap.pop();
    this.sinkDown(0);
    return value;
  }

  findIndex(value: T, compare?: Function): number {
    if (!compare) compare = (a: any, b: any) => a === b;
    for (let i = 0; i < this.size(); i++) {
      if (compare(value, this.heap[i])) {
        return i;
      }
    }
    return -1;
  }

  valueAt(index: number): T | undefined {
    return this.heap[index];
  }

  updateAt(index: number, value: T): number {
    this.heap[index] = value;
    let newIndex = this.swimUp(index);
    newIndex = this.sinkDown(index);
    return newIndex;
  }

  removeAt(index: number) {
    this.swap(index, this.size() - 1);
    this.heap.pop();
    this.swimUp(index);
    this.sinkDown(index);
  }

  remove(value: T, compare?: Function) {
    this.removeAt(this.findIndex(value, compare));
  }

  heapify(values: T[]) {
    this.heap = values;
    for (let i = Math.floor(this.size() / 2 - 1); i >= 0; i--) {
      this.sinkDown(i);
    }
  }
}

/**
 * A Complete Binary Tree is a tree in which at every level except
 * possibly the last one is completely filled and all the nodes are
 * as far left as possible.
 */
