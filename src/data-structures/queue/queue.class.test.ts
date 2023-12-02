import { Queue } from './queue.class';

describe('Queue', () => {
  test('should create an empty queue', () => {
    const queue = new Queue<number>();
    expect(queue.peek()).toBeUndefined();
  });

  test('should enqueue properly', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    expect(queue.peek()).toBe(1);
  });

  test('should dequeue properly', () => {
    const queue = new Queue<number>();

    queue.enqueue(1);
    expect(queue.peek()).toBe(1);

    const value = queue.dequeue();
    expect(value).toBe(1);
    expect(queue.peek()).toBeUndefined();
  });

  test('should handle queue properly', () => {
    const queue = new Queue<number>();

    queue.enqueue(1);
    expect(queue.peek()).toBe(1);

    queue.enqueue(3);
    expect(queue.peek()).toBe(1);

    expect(queue.dequeue()).toBe(1);
    expect(queue.peek()).toBe(3);

    expect(queue.dequeue()).toBe(3);
    expect(queue.peek()).toBeUndefined();

    expect(queue.dequeue()).toBeUndefined();
    expect(queue.peek()).toBeUndefined();
  });

  test('should handle size properly', () => {
    const queue = new Queue<number>();

    expect(queue.size()).toBe(0);

    queue.enqueue(3);
    expect(queue.size()).toBe(1);

    queue.dequeue();
    expect(queue.size()).toBe(0);

    queue.enqueue(10);
    queue.enqueue(11);
    expect(queue.size()).toBe(2);
  });
});
