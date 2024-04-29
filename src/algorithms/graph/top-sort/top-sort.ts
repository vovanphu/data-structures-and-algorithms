import { Graph } from '@root/data-structures';
import {
  TopSortStrategy_Interface,
  Kahn_TopSortStrategy,
} from './top-sort-strategy';

export function topSort(
  graph: Graph,
  strategy: new (
    ...args: any[]
  ) => TopSortStrategy_Interface = Kahn_TopSortStrategy,
): number[] {
  return new strategy().execute(graph);
}
