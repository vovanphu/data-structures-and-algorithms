import { DirectedGraph } from '@root/data-structures';
import { FindAugmentingPathStrategy_Interface } from './find-augmenting-path-strategy';
import { Dfs_FindAugmentingPathStrategy } from './find-augmenting-path-strategy';

export function findAugmentingPath(
  residual: DirectedGraph,
  start: number,
  end: number,
  strategy: new (
    ...args: any[]
  ) => FindAugmentingPathStrategy_Interface = Dfs_FindAugmentingPathStrategy,
): number[] {
  return new strategy().execute(residual, start, end);
}
