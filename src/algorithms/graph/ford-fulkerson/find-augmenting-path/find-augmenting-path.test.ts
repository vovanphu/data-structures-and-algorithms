import { DirectedGraph } from '@root/data-structures';
import { findAugmentingPath } from './find-augmenting-path';

describe('Dfs_FindAugmentingPathStrategy', () => {
  test('return the correct answer for simple residual graph', () => {
    const residual = new DirectedGraph([
      [0, 1, 1],
      [1, 0, 0],
      [0, 2, 0],
      [2, 0, 0],
      [1, 3, 1],
      [3, 1, 0],
    ]);

    const prev = findAugmentingPath(residual, 0, 3);
    expect(prev).toEqual([undefined, 0, undefined, 1]);
  });
});
