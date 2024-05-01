import { BinaryHeap } from '../heap/binary-heap.class';

/**
 * Notice: Indexed Priority Queue doesn't allow duplicate values
 * since it use these values as unique identifiers
 * to find item index in a hash table
 * In this IndexedPriorityQueue we use d-ary heap as it barebone structure
 */
export class IndexedPriorityQueue<
  V extends any = any,
  T extends [V, number] = [V, number],
> {
  protected d: number;

  protected heap: T[] = [];

  protected pHash: Map<V, number> = new Map();

  protected comparator = (a: T, b: T) => a[1] - b[1];

  constructor(d: number = 2) {
    this.d = d;
  }

  /**
   * Return the parent's index of the given node index
   * @param index
   * @returns Index of the given node's parent
   */
  protected parentIndex(index: number): number {
    return Math.floor((index - 1) / this.d);
  }

  /**
   * Return the child's indices of the given node index
   * @param index
   * @return Indexes of the given node's childrens
   */
  protected childIndices(index: number): number[] {
    const indices: number[] = [];

    for (let i = 1; i <= this.d; i++) {
      const childIndex = this.d * index + i;
      if (childIndex >= this.size()) continue;
      indices.push(childIndex);
    }

    return indices;
  }

  /**
   * Return a negative if a < b, 0 if a === b
   * @param a
   * @param b
   * @returns
   */
  protected compare(a: T, b: T): number {
    if (a === undefined) return 1;
    if (b === undefined) return -1;
    return this.comparator(a, b);
  }

  /**
   * Swap the value of source and destination in the array
   * @param source
   * @param destination
   */
  protected swap(source: number, destination: number): void {
    if (
      this.heap[source] === undefined ||
      this.heap[destination] === undefined
    ) {
      throw Error('Swap undefined error');
    }

    [this.heap[source], this.heap[destination]] = [
      this.heap[destination],
      this.heap[source],
    ];

    this.pHash.set(this.heap[source][0], source);
    this.pHash.set(this.heap[destination][0], destination);
  }

  /**
   * Method used in heapify, check if the current index value
   * is validated with parent value or not, and swim it up in
   * needed until it valid
   * @param index
   * @returns
   */
  protected swimUp(index: number): number {
    // Stop when reach the root position
    if (index === 0) return index;

    const parentIndex = this.parentIndex(index);
    const value = this.heap[index];
    const parentValue = this.heap[parentIndex];

    // Compare the parent value with current value
    // make sure parent value <= current value
    // if not, it need to be swaped and continue swim up
    if (this.compare(parentValue, value) <= 0) return index;

    this.swap(parentIndex, index);
    return this.swimUp(parentIndex);
  }

  /**
   * Method used in heapify, check if the current index value
   * is validated with it childs or not, and sink it down in
   * need until it valid
   * @param index
   */
  protected sinkDown(index: number): number {
    const childIndices = this.childIndices(index);

    // Stop when reach a leaf position
    if (childIndices.length === 0) return index;

    // Retrieve the childs's min value index
    const minValueChildIndex = childIndices.reduce(
      (minValueIndex, currentIndex) => {
        return this.compare(
          this.heap[minValueIndex],
          this.heap[currentIndex],
        ) <= 0
          ? minValueIndex
          : currentIndex;
      },
      childIndices[0],
    );

    // Stop process if this position is valid
    if (this.compare(this.heap[index], this.heap[minValueChildIndex]) <= 0) {
      return index;
    }

    // Swap the value and continue to sink down
    this.swap(index, minValueChildIndex);
    return this.sinkDown(minValueChildIndex);
  }

  /**
   * Return the size of the heap
   * @returns
   */
  size(): number {
    return this.heap.length;
  }

  /**
   * Find the index of input item
   * @param key
   * @param compare
   * @returns
   */
  findIndex(key: V): number {
    const index = this.pHash.get(key);
    if (index === undefined || index < 0) return -1;
    return index;
  }

  /**
   * Remove the item of given index out of the heap
   * @param index
   */
  removeAtIndex(index: number): void {
    if (index < -1 || index >= this.heap.length) return;

    // First swap the given item with the last item
    this.swap(index, this.size() - 1);

    // Remove the item out of the heap by popping
    // the last item
    const value = this.heap.pop();
    if (value !== undefined) this.pHash.delete(value[0]);

    // Rebalance the heap from the input index
    // swim up and then sink down
    this.swimUp(index);
    this.sinkDown(index);
  }

  /**
   * Find and remove the index item out of the heap
   * @param key
   */
  remove(key: V): void {
    this.removeAtIndex(this.findIndex(key));
  }

  /**
   * Update the item of given index out of the heap
   * @param index
   */
  updateAtIndex(index: number, value: T): number {
    if (index < -1 || index >= this.heap.length) return -1;

    const oldValue = this.heap[index];
    this.heap[index] = value;
    this.pHash.delete(oldValue[0]);
    this.pHash.set(value[0], index);

    // Rebalance the heap from the input index
    // swim up and then sink down
    let newIndex = this.swimUp(index);
    newIndex = this.sinkDown(index);

    return newIndex;
  }

  update(key: V, priority: number): number {
    return this.updateAtIndex(this.findIndex(key), [key, priority] as T);
  }

  get(key: V): number | undefined {
    let index = this.findIndex(key);
    if (index < 0) return undefined;
    return this.heap[index][1];
  }

  has(key: V): boolean {
    return this.pHash.has(key);
  }

  /**
   * Return the item at the root,
   * min value in a min-heap
   * and max value in a max-heap
   * @returns
   */
  peek(): T | undefined {
    return this.heap[0];
  }

  enqueue(key: V, priority: number): number {
    const index = this.findIndex(key);

    if (index > -1) {
      return this.updateAtIndex(index, [key, priority] as T);
    }

    this.heap.push([key, priority] as T);
    this.pHash.set(key, this.size() - 1);

    return this.swimUp(this.size() - 1);
  }

  dequeue(): T | undefined {
    if (this.size() === 0) return undefined;

    // First swap the first item with the item at the end
    this.swap(0, this.size() - 1);

    // Take out the item at the end,
    // it is the root item at the first place
    const value = this.heap.pop();
    if (value !== undefined) this.pHash.delete(value[0]);

    // Now sink the current root item
    // until it reach a valid position
    this.sinkDown(0);

    return value;
  }
}
