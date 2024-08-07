import { kthLargestElement } from './kth-largest-element';

describe('kthLargestElement', () => {
  test('finds the k-th largest element in a basic case', () => {
    expect(kthLargestElement([3, 2, 1, 5, 6, 4], 2)).toBe(5);
  });

  test('finds the k-th largest element when k is 1', () => {
    expect(kthLargestElement([3, 2, 1, 5, 6, 4], 1)).toBe(6);
  });

  test('finds the k-th largest element in a sorted array', () => {
    expect(kthLargestElement([1, 2, 3, 4, 5, 6], 4)).toBe(3);
  });

  test('finds the k-th largest element in a reverse sorted array', () => {
    expect(kthLargestElement([6, 5, 4, 3, 2, 1], 4)).toBe(3);
  });

  test('finds the k-th largest element in an array with duplicates', () => {
    expect(kthLargestElement([3, 2, 1, 5, 6, 4, 4, 4], 4)).toBe(4);
  });

  test('handles an array with a single element', () => {
    expect(kthLargestElement([1], 1)).toBe(1);
  });

  test('handles the k-th largest element in an array with all identical elements', () => {
    expect(kthLargestElement([2, 2, 2, 2, 2], 3)).toBe(2);
  });

  test('handles k equal to the length of the array', () => {
    expect(kthLargestElement([3, 2, 1, 5, 6, 4], 6)).toBe(1);
  });

  test('handles k greater than the length of the array (should throw an error)', () => {
    expect(() => kthLargestElement([3, 2, 1, 5, 6, 4], 7)).toThrow();
  });

  test('handles k equal to 0 (should throw an error)', () => {
    expect(() => kthLargestElement([3, 2, 1, 5, 6, 4], 0)).toThrow();
  });

  test('handles an empty array (should throw an error)', () => {
    expect(() => kthLargestElement([], 1)).toThrow();
  });
});
