import { Graph } from '@root/data-structures';
import { FindComponentsStrategy_Interface } from './find-component-strategy.interface';
import { Dfs_FindComponentsStrategy } from './dfs.find-components-strategy';

export function findComponents(
  graph: Graph,
  strategy: new (
    ...args: any[]
  ) => FindComponentsStrategy_Interface = Dfs_FindComponentsStrategy,
): Array<Array<number>> {
  return new strategy().execute(graph);
}
