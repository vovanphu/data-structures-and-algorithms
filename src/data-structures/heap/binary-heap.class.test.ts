import { BinaryHeap } from './binary-heap.class';

describe('BinaryHeap', () => {
  it('should insert values and maintain heap property', () => {
    const heap = new BinaryHeap<number>();
    heap.insert(5);
    heap.insert(3);
    heap.insert(8);
    heap.insert(1);
    heap.insert(4);

    expect(heap.size()).toBe(5);
    expect(heap.peek()).toBe(1);
  });

  it('should extract minimum value and maintain heap property', () => {
    const heap = new BinaryHeap<number>();
    heap.insert(5);
    heap.insert(3);
    heap.insert(8);
    heap.insert(1);
    heap.insert(4);

    const minValue = heap.poll();

    expect(minValue).toBe(1);
    expect(heap.size()).toBe(4);
    expect(heap.peek()).toBe(3);
  });

  it('should remove element and maintain heap property', () => {
    const heap = new BinaryHeap<number>();
    heap.insert(5);
    heap.insert(3);
    heap.insert(8);
    heap.insert(1);
    heap.insert(4);

    heap.remove(3);

    expect(heap.size()).toBe(4);
    expect(heap.peek()).toBe(1);
  });

  it('should correctly heapify an array', () => {
    const values = [9, 5, 7, 2, 4, 1];
    const heap = new BinaryHeap<number>(values);

    expect(heap.size()).toBe(values.length);
    expect(heap.peek()).toBe(1);
  });

  it('should find the index of a value', () => {
    const heap = new BinaryHeap<number>();
    heap.insert(5);
    heap.insert(3);
    heap.insert(8);
    heap.insert(1);
    heap.insert(4);

    const index = heap.findIndex(3);

    expect(index).toBe(1);
  });

  it('should remove element by value and maintain heap property', () => {
    const heap = new BinaryHeap<number>();
    heap.insert(5);
    heap.insert(3);
    heap.insert(8);
    heap.insert(1);
    heap.insert(4);

    heap.remove(3);

    expect(heap.size()).toBe(4);
    expect(heap.peek()).toBe(1);
  });
});
