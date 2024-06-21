import { DirectedGraph } from '@root/data-structures';
import { tarjan } from './tarjan';

describe('Tarjan Algorithm', () => {
  test('Finding Strongly Connected Components in a graph', () => {
    const graph = new DirectedGraph();
    graph.set(0, 1);
    graph.set(1, 2);
    graph.set(2, 0);
    graph.set(3, 4);
    graph.set(4, 5);
    graph.set(5, 3);
    graph.set(2, 3);
    graph.set(2, 6);
    graph.set(6, 5);
    graph.set(6, 7);
    graph.set(7, 6);

    const sccCount = tarjan(graph);
    expect(sccCount.length).toBe(3);
  });

  test('Finding Strongly Connected Components in a cyclic graph', () => {
    const graph = new DirectedGraph();
    graph.set(0, 1);
    graph.set(1, 2);
    graph.set(2, 3);
    graph.set(3, 4);
    graph.set(4, 0);

    const sccCount = tarjan(graph);
    expect(sccCount.length).toBe(1);
  });

  test('Finding Strongly Connected Components in a complicated cyclic graph', () => {
    const graph = new DirectedGraph([
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 3],
      [2, 3],
      [3, 4],
      [3, 5],
      [4, 2],
      [4, 5],
      [4, 6],
      [5, 7],
      [6, 5],
      [7, 6],
    ]);

    const sccCount = tarjan(graph);
    expect(sccCount.length).toBe(3);
  });

  test('Finding Strongly Connected Components in a disconnected graph', () => {
    const graph = new DirectedGraph();
    graph.set(0, 1);
    graph.set(1, 2);
    graph.set(2, 0);
    graph.set(3, 4);
    graph.set(4, 5);

    const sccCount = tarjan(graph);
    expect(sccCount.length).toBe(4);
  });
});
