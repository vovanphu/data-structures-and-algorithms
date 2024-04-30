import { BinaryHeap } from '../heap/binary-heap.class';

export class PriorityQueue<
  V extends any = any,
  T extends [V, number] = [V, number],
> {
  protected heap: BinaryHeap<T>;
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

  enqueue(value: V, priority: number) {
    this.heap.insert([value, priority] as T);
  }

  dequeue(): T | undefined {
    return this.heap.poll();
  }
}
