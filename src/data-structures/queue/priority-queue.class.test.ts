import { PriorityQueue } from './priority-queue.class';

describe('PriorityQueue', () => {
  it('should enqueue elements with priorities and maintain the heap property', () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue('A', 5);
    queue.enqueue('B', 3);
    queue.enqueue('C', 8);
    queue.enqueue('D', 1);
    queue.enqueue('E', 4);

    expect(queue.size()).toBe(5);
    expect(queue.peek()).toEqual(['D', 1]);
  });

  it('should create duplicate for existing element and maintain the heap property', () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue('A', 5);
    queue.enqueue('B', 3);
    queue.enqueue('C', 8);

    queue.enqueue('B', 2);

    expect(queue.size()).toBe(4);
    expect(queue.peek()).toEqual(['B', 2]);
  });

  it('should dequeue elements in the correct priority order and maintain the heap property', () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue('A', 5);
    queue.enqueue('B', 3);
    queue.enqueue('C', 8);
    queue.enqueue('D', 1);
    queue.enqueue('E', 4);

    const dequeued1 = queue.dequeue();
    const dequeued2 = queue.dequeue();
    const dequeued3 = queue.dequeue();

    expect(dequeued1).toEqual(['D', 1]);
    expect(dequeued2).toEqual(['B', 3]);
    expect(dequeued3).toEqual(['E', 4]);
    expect(queue.size()).toBe(2);
    expect(queue.peek()).toEqual(['A', 5]);
  });

  it('should handle removing elements and maintain the heap property', () => {
    const queue = new PriorityQueue<string>();
    queue.enqueue('A', 5);
    queue.enqueue('B', 3);
    queue.enqueue('C', 8);
    queue.enqueue('D', 1);
    queue.enqueue('E', 4);

    queue.enqueue('B', 2);
    queue.dequeue();
    queue.dequeue();
    queue.dequeue();
    queue.dequeue();
    queue.dequeue();

    expect(queue.size()).toBe(1);
    expect(queue.peek()).toEqual(['C', 8]);
  });

  it('should handle empty queue', () => {
    const queue = new PriorityQueue<string>();

    expect(queue.size()).toBe(0);
    expect(queue.peek()).toBeUndefined();
    expect(queue.dequeue()).toBeUndefined();
  });
});
