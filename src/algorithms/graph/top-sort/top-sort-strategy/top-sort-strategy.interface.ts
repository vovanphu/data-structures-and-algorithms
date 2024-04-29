import { DirectedGraph } from '@root/data-structures';

export interface TopSortStrategy_Interface {
  execute(graph: DirectedGraph): number[];
}
