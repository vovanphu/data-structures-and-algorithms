import { Graph } from '@root/data-structures';
import { Kahn_TopSortStrategy } from './kahn.top-sort-strategy';
import { TopSortStrategy_Interface } from './top-sort-strategy.interface';

export function topSort(
  graph: Graph,
  strategy: new (
    ...args: any[]
  ) => TopSortStrategy_Interface = Kahn_TopSortStrategy,
): number[] {
  return new strategy().execute(graph);
}
