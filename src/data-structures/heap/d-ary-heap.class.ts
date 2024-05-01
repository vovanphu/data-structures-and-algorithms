/**
 * D-ary Heap is a gneralization of the binary heap
 * in which the nodes have d chidren instead of 2.
 * This data structure allows decrease priority operations
 * to be performed more quickly than binary heaps at the expense
 * of slower poll operation.
 *
 * Given a d-ary heap have a note at index i,
 * its children are at indices d*i + 1 to d*i + d,
 * and its parent is at index (i - 1)/2.
 */

export class DAryHeap<T = number> {
  protected d: number;

  protected heap: T[] = [];

  protected comparator: Function;

  protected defaultComparator: Function = (a: any, b: any) => a - b;

  protected defaultEqualComparator: Function = (a: any, b: any) => a === b;

  // Support difference constructors

  constructor(d: number);

  constructor(d: number, compare: Function);

  constructor(d: number, values: T[]);

  constructor(d: number, values: T[], compare: Function);

  // Implementation of constructure
  constructor(
    d: number,
    valuesOrCompare?: T[] | Function,
    comparator?: Function,
  ) {
    this.d = d;

    if (comparator === undefined) {
      comparator = this.defaultComparator;
    }

    if (typeof valuesOrCompare === 'function') {
      comparator = valuesOrCompare;
    }

    this.comparator = comparator;

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
    return Math.floor((index - 1) / this.d);
  }

  /**
   * Return the child's indices of the given node index
   * @param index
   * @returns
   */
  protected childIndices(index: number): number[] {
    const indices: number[] = [];

    for (let i = 1; i <= this.d; i++) {
      const childIndex = this.d * index + i;

      if (childIndex < this.size()) {
        indices.push(childIndex);
      }
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
  findIndex(value: T, compare: Function = this.defaultEqualComparator): number {
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
    if (index < -1 || index >= this.heap.length) return;

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
   * Update the item of given index out of the heap
   * @param index
   */
  updateAtIndex(index: number, value: T): number {
    if (index < -1 || index >= this.heap.length) return -1;

    this.heap[index] = value;

    // Rebalance the heap from the input index
    // swim up and then sink down
    let newIndex = this.swimUp(index);
    newIndex = this.sinkDown(index);

    return newIndex;
  }

  update(
    value: T,
    newValue: T,
    compare: Function = this.defaultEqualComparator,
  ): number {
    return this.updateAtIndex(this.findIndex(value, compare), newValue);
  }

  valueAt(index: number): T | undefined {
    return this.heap[index];
  }

  /**
   * Find and remove the index item out of the heap
   * @param value
   * @param compare
   */
  remove(value: T, compare: Function = this.defaultEqualComparator): void {
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
