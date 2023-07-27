import { BinaryHeap } from './binary-heap.class';

export class IndexedPriorityQueue<
  V extends any = any,
  T extends [V, number] = [V, number],
> {
  private heap: BinaryHeap<T>;
  private hash: Map<V, number> = new Map();
  private compare = (a: T, b: T) => b[1] - a[1];

  constructor() {
    this.heap = new BinaryHeap<T>(this.compare);
  }

  size(): number {
    return this.heap.size();
  }

  peek(): T | undefined {
    return this.heap.peek();
  }

  findIndex(value: V): number {
    const index = this.hash.get(value);
    if (index !== undefined && index > -1) {
      return index;
    }
    return -1;
  }

  enqueue(value: V, priority: number) {
    const index = this.findIndex(value);
    if (index > -1) {
      const newIndex = this.heap.updateAt(index, [value, priority] as T);
      this.hash.set(value, newIndex);
    } else {
      const newIndex = this.heap.insert([value, priority] as T);
      this.hash.set(value, newIndex);
    }
  }

  dequeue(): T | undefined {
    const item = this.heap.poll();
    if (item) this.hash.delete(item[0]);
    return item;
  }
}
