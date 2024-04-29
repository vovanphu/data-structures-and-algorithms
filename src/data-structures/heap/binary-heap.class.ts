/**
 * A heap is a specialized tree-based data structure that satisfies
 * the heap property: In a min heap, for any given node C, if P is
 * a parent node of C, then the value of P is smaller than or equal
 * to the value of C. The node at the top of the heap is called the
 * root node, and it is always has the smallest value.
 *
 * Given a note at index i, its children are at indices 2i + 1
 * and 2i + 2, and its parent is at index (i - 1)/2.
 */

export class BinaryHeap<T = number> {
  protected heap: T[] = [];

  protected lessThanCompare: Function;

  protected defaultLessThanCompare: Function = (a: any, b: any) => b - a;

  protected defaultEqualCompare: Function = (a: any, b: any) => a === b;

  // Support difference constructors

  constructor();

  constructor(compare: Function);

  constructor(values: T[]);

  constructor(values: T[], compare: Function);

  // Implementation of constructure
  constructor(valuesOrCompare?: T[] | Function, compare?: Function) {
    if (compare === undefined) {
      compare = this.defaultLessThanCompare;
    }

    if (typeof valuesOrCompare === 'function') {
      compare = valuesOrCompare;
    }

    this.lessThanCompare = compare;

    if (Array.isArray(valuesOrCompare)) {
      this.heapify(valuesOrCompare);
    }
  }

  /**
   * Return the parent's index of the given node index
   * @param index
   * @returns
   */
  protected parentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  /**
   * Return the left child's index of the given node index
   * @param index
   * @returns
   */
  protected leftIndex(index: number): number {
    return 2 * index + 1;
  }

  /**
   * Return the right child's index of the given node index
   * @param index
   * @returns
   */
  protected rightIndex(index: number): number {
    return 2 * index + 2;
  }

  /**
   * Return true if a is less than b
   * @param a
   * @param b
   * @returns
   */
  protected isLessThan(a: T, b: T): boolean {
    if (a === undefined || b === undefined) {
      throw new Error('Invalid inputs');
    }

    return this.lessThanCompare(a, b) > 0;
  }

  /**
   * Swap the value of source and destination in the array
   * @param source
   * @param destination
   */
  protected swap(source: number, destination: number): void {
    [this.heap[source], this.heap[destination]] = [
      this.heap[destination],
      this.heap[source],
    ];
  }

  /**
   * Method used in heapify, check if the current index value
   * is validated with parent value or not, and swim it up in
   * needed until it valid
   * @param index
   * @returns
   */
  protected swimUp(index: number): number {
    const parentIndex = this.parentIndex(index);

    // Parent index is less than 0 mean we are at the root
    if (parentIndex < 0) return index;

    const value = this.heap[index];
    const parentValue = this.heap[parentIndex];

    // Compare current value with parent's value
    // Less than parent's value means invalid so
    // it need to be swaped with the parent and
    // continue swim up
    if (!this.isLessThan(value, parentValue)) return index;
    this.swap(index, parentIndex);
    return this.swimUp(parentIndex);
  }

  /**
   * Method used in heapify, check if the current index value
   * is validated with it childs or not, and sink it down in
   * need until it valid
   * @param index
   */
  protected sinkDown(index: number): number {
    const leftIndex = this.leftIndex(index);
    const rightIndex = this.rightIndex(index);

    // Out of array bound mean the current node is a leaf
    // and are unable to sink down anymore
    if (leftIndex >= this.size()) return index;

    const value = this.heap[index];
    const leftValue = this.heap[leftIndex];
    const rightValue =
      rightIndex < this.size() ? this.heap[rightIndex] : undefined;

    // Check to know if we are working with left branch
    if (rightValue === undefined || this.isLessThan(leftValue, rightValue)) {
      // Compare current value with left child value to see
      // whenever it valid or not
      if (this.isLessThan(value, leftValue)) return index;
      this.swap(index, leftIndex);
      return this.sinkDown(leftIndex);
    }

    // Or we are working with right branch
    if (this.isLessThan(value, rightValue)) return index;
    this.swap(index, rightIndex);
    return this.sinkDown(rightIndex);
  }

  /**
   * Return the size of the heap
   * @returns
   */
  size(): number {
    return this.heap.length;
  }

  /**
   * Add new item to the heap
   * @param value
   * @returns
   */
  insert(value: T): number {
    // Insert new item at the end of the array
    this.heap.push(value);

    // Swim it up until it reach a valid position
    return this.swimUp(this.size() - 1);
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

  /**
   * Take the item at the root out of the heap
   * @returns
   */
  poll(): T | undefined {
    if (this.size() === 0) return undefined;

    // First swap the first item with the item at the end
    this.swap(0, this.size() - 1);

    // Take out the item at the end,
    // it is the root item at the first place
    const value = this.heap.pop();

    // Now sink the current root item
    // until it reach a valid position
    this.sinkDown(0);

    return value;
  }

  /**
   * Find the index of input item
   * @param value
   * @param compare
   * @returns
   */
  findIndex(value: T, compare: Function = this.defaultEqualCompare): number {
    for (let i = 0; i < this.size(); i++) {
      if (compare(value, this.heap[i])) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Remove the item of given index out of the heap
   * @param index
   */
  removeAtIndex(index: number): void {
    // First swap the given item with the last item
    this.swap(index, this.size() - 1);

    // Remove the item out of the heap by popping
    // the last item
    this.heap.pop();

    // Rebalance the heap from the input index
    // swim up and then sink down
    this.swimUp(index);
    this.sinkDown(index);
  }

  /**
   * Find and remove the index item out of the heap
   * @param value
   * @param compare
   */
  remove(value: T, compare: Function = this.defaultEqualCompare): void {
    this.removeAtIndex(this.findIndex(value, compare));
  }

  /**
   * Assign the heap with given items and then balance it
   * @param values
   */
  heapify(values: T[]): void {
    this.heap = values;

    // The last non-leaf: is the parent
    // of the last item in the heap
    const lastNonLeafIndex = this.parentIndex(this.size() - 1);

    // Loop through items of the heap
    // starting from the last non-leaf
    // going up to the root
    // and sink down every invalid items
    for (let i = lastNonLeafIndex; i >= 0; i--) {
      this.sinkDown(i);
    }
  }
}
