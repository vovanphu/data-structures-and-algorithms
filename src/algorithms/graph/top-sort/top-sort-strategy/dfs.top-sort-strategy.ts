import { DirectedGraph } from '@root/data-structures';
import { TopSortStrategy_Interface } from './top-sort-strategy.interface';

export class Dfs_TopSortStrategy implements TopSortStrategy_Interface {
  /**
   * Construct topology order using depth first search
   * @param graph
   * @returns The topology order
   */
  execute(graph: DirectedGraph): number[] {
    // Variables for calculate result
    const order: number[] = Array.from({ length: graph.size() });
    let currentIndex = graph.size() - 1;

    // Variables for traversal
    const permenant_visited: boolean[] = Array.from(
      { length: graph.size() },
      () => false,
    );

    // Calculate top order
    for (let vertex = 0; vertex < graph.size(); vertex++) {
      if (permenant_visited[vertex]) continue;

      try {
        currentIndex = this.topSort(
          graph,
          vertex,
          order,
          currentIndex,
          permenant_visited,
        );
      } catch (e: unknown) {
        if (e instanceof Error && e.message === 'Graph has cycle') {
          return [];
        }
        throw e;
      }
    }

    return order;
  }

  /**
   * Helper function
   * @param graph
   * @param vertex
   * @param permenant_visited
   * @param order
   * @param currentIndex
   * @returns new value of the currentIndex
   */
  protected topSort(
    graph: DirectedGraph,
    vertex: number,
    order: number[],
    currentIndex: number,
    permenant_visited: boolean[],
    temporary_visited: boolean[] = Array.from(
      { length: graph.size() },
      () => false,
    ),
  ): number {
    if (temporary_visited[vertex]) {
      throw Error('Graph has cycle');
    }

    temporary_visited[vertex] = true;

    for (const neighbor of graph.neighbors(vertex)) {
      if (permenant_visited[neighbor]) continue;

      currentIndex = this.topSort(
        graph,
        neighbor,
        order,
        currentIndex,
        permenant_visited,
        temporary_visited,
      );
    }

    permenant_visited[vertex] = true;
    order[currentIndex] = vertex;

    return currentIndex - 1;
  }
}
