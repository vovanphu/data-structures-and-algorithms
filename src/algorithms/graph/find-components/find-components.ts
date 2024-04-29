import { Graph } from '@root/data-structures';
import {
  FindComponentsStrategy_Interface,
  Dfs_FindComponentsStrategy,
} from './find-components-strategy';

export function findComponents(
  graph: Graph,
  strategy: new (
    ...args: any[]
  ) => FindComponentsStrategy_Interface = Dfs_FindComponentsStrategy,
): Array<Array<number>> {
  return new strategy().execute(graph);
}
