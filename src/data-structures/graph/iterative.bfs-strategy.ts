import { BfsStrategy_Interface } from './bfs-strategy.interface';
import { Graph } from './graph.class';
import { Queue } from '../queue/queue.class';

export class Iterative_BfsStrategy implements BfsStrategy_Interface {
  execute(graph: Graph, startingVertex: number, callback: Function) {
    const visited: boolean[] = new Array<boolean>(graph.size()).fill(false);
    const queue: Queue<number> = new Queue();

    queue.enqueue(startingVertex);

    while (queue.peek() !== undefined) {
      const vertex = queue.dequeue() as number;

      if (visited[vertex]) continue;
      visited[vertex] = true;
      callback(vertex);

      for (const neighbor of graph.neighbors(vertex)) {
        queue.enqueue(neighbor);
      }
    }
  }
}
