import { DirectedGraph } from '@root/data-structures';

export interface FordFulkersonStrategy_Interface {
  execute(graph: DirectedGraph, start: number, end: number): number;
}
