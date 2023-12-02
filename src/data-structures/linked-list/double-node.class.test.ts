import { DoubleNode } from './double-node.class';

describe('DoubleNode', () => {
  test('should create a DoubleNode with a value', () => {
    const node = new DoubleNode<number>(11);
    expect(node.value).toBe(11);
    expect(node.next).toBeNull();
    expect(node.prev).toBeNull();
  });

  test('should update the next property', () => {
    const node = new DoubleNode<number>(9);
    const next = new DoubleNode<number>(7);

    expect(node.next).toBeNull();

    node.next = next;
    expect(node.next).toBe(next);
  });

  test('should update the prev property', () => {
    const node = new DoubleNode<number>(1);
    const prev = new DoubleNode<number>(-1);

    expect(node.next).toBeNull();

    node.prev = prev;
    expect(node.prev).toBe(prev);
  });

  test('should update the next and prev property', () => {
    const node = new DoubleNode<number>(0);
    const next = new DoubleNode<number>(1);
    const prev = new DoubleNode<number>(-1);

    expect(node.next).toBeNull();
    expect(node.prev).toBeNull();

    node.next = next;
    expect(node.next).toBe(next);

    node.prev = prev;
    expect(node.prev).toBe(prev);

    expect(node.value).toBe(0);
    expect(node.next.value).toBe(1);
    expect(node.prev.value).toBe(-1);
  });
});
