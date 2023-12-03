import { BfsStrategy } from './bfs-strategy.interface';
import { Graph } from './graph.class';
import { Queue } from '../queue/queue.class';

export class Recursive_BfsStrategy implements BfsStrategy {
  execute(
    graph: Graph,
    startingVertex: number,
    callback: Function,
    visited: boolean[] = new Array(graph.size()).fill(false),
  ) {
    const queue = new Queue<number>();
    queue.enqueue(startingVertex);
    this._bfs(graph, callback, queue, visited);
  }

  private _bfs(
    graph: Graph,
    callback: Function,
    queue: Queue<number>,
    visited: boolean[],
  ) {
    if (queue.size() === 0) return;

    const vertex = queue.dequeue() as number;

    if (!visited[vertex]) {
      visited[vertex] = true;
      callback(vertex);

      for (const neighbor of graph.neighbors(vertex)) {
        queue.enqueue(neighbor);
      }
    }

    this._bfs(graph, callback, queue, visited);
  }
}