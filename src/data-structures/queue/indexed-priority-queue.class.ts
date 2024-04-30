import { BinaryHeap } from '../heap/binary-heap.class';

/**
 * Notice: Indexed Priority Queue doesn't allow duplicate values
 * since it use these values as unique identifiers
 * to find item index in a hash table
 */
export class IndexedPriorityQueue<
  V extends any = any,
  T extends [V, number] = [V, number],
> {
  protected heap: BinaryHeap<T>;
  protected hash: Map<V, number> = new Map();
  protected comparator = (a: T, b: T) => a[1] - b[1];

  constructor() {
    this.heap = new BinaryHeap<T>(this.comparator);
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
      const newIndex = this.heap.updateAtIndex(index, [value, priority] as T);
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
