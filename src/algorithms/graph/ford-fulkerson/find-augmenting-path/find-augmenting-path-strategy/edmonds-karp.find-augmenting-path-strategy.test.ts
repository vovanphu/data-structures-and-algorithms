import { DirectedGraph } from '@root/data-structures';
import { EdmondsKarp_FindAugmentingPathStrategy } from './edmonds-karp.find-augmenting-path-strategy';

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

    const findAugmentingPath = new EdmondsKarp_FindAugmentingPathStrategy();
    const prev = findAugmentingPath.execute(residual, 0, 3);

    expect(prev).toEqual([undefined, 0, undefined, 1]);
  });
});
