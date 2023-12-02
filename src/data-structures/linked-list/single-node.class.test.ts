import { SingleNode } from './single-node.class';

describe('SingleNode', () => {
  test('should create a SingleNode with a value', () => {
    const node = new SingleNode<number>(42);
    expect(node.value).toBe(42);
    expect(node.next).toBeNull();
  });

  // Additional Test Case: Ensure the next property can be updated
  test('should update the next property of a SingleNode', () => {
    const node = new SingleNode<number>(10);
    const nextNode = new SingleNode<number>(20);

    // Initially, the next property is null
    expect(node.next).toBeNull();

    // Update the next property
    node.next = nextNode;

    // Now, the next property should be the new node
    expect(node.next).toBe(nextNode);
  });
});
