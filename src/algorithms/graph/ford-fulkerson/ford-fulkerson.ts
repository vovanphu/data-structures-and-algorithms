import { DirectedGraph } from '@root/data-structures';
import {
  Dfs_FordFulkersonStrategy,
  FordFulkersonStrategy_Interface,
} from './ford-fulkerson-strategy';

/**
 * Function calculate and return maximum flow of a given flow network (a directed graph)
 * using ford fulkerson method
 *
 * @param graph
 * @param start
 * @param end
 * @returns The maximum network flow value
 */
export function fordFulkerson(
  graph: DirectedGraph,
  start: number,
  end: number,
  strategy: new (
    ...args: any[]
  ) => FordFulkersonStrategy_Interface = Dfs_FordFulkersonStrategy,
): number {
  return new strategy().execute(graph, start, end);
}
