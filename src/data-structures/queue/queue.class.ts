import { SingleNode } from '../linked-list/single-node.class';

export class Queue<T> {
  protected head: SingleNode<T> | null = null;
  protected tail: SingleNode<T> | null = null;
  protected count: number = 0;

  enqueue(item: T): void {
    const node = new SingleNode<T>(item);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    this.count++;
  }

  dequeue(): T | undefined {
    if (this.head === null) return undefined;
    const node = this.head;
    this.head = this.head.next;
    if (this.head === null) this.tail = null;
    this.count--;
    return node.value;
  }

  peek(): T | undefined {
    if (this.head === null) return undefined;
    return this.head.value;
  }

  size(): number {
    return this.count;
  }
}
