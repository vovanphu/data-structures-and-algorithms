import { Graph } from './graph.class';
import { tarjanAlgorithm } from './tarjan-algorithm';

describe('Tarjan Algorithm', () => {
  test('Finding Strongly Connected Components in a graph', () => {
    const graph = new Graph(8);
    graph.addEdge(0, 1);
    graph.addEdge(1, 2);
    graph.addEdge(2, 0);
    graph.addEdge(3, 4);
    graph.addEdge(4, 5);
    graph.addEdge(5, 3);
    graph.addEdge(2, 3);
    graph.addEdge(2, 6);
    graph.addEdge(6, 5);
    graph.addEdge(6, 7);
    graph.addEdge(7, 6);

    const sccCount = tarjanAlgorithm(graph);
    expect(sccCount).toBe(3);
  });

  test('Finding Strongly Connected Components in a cyclic graph', () => {
    const graph = new Graph(5);
    graph.addEdge(0, 1);
    graph.addEdge(1, 2);
    graph.addEdge(2, 3);
    graph.addEdge(3, 4);
    graph.addEdge(4, 0);

    const sccCount = tarjanAlgorithm(graph);
    expect(sccCount).toBe(1);
  });

  test('Finding Strongly Connected Components in a disconnected graph', () => {
    const graph = new Graph(6);
    graph.addEdge(0, 1);
    graph.addEdge(1, 2);
    graph.addEdge(2, 0);
    graph.addEdge(3, 4);
    graph.addEdge(4, 5);

    const sccCount = tarjanAlgorithm(graph);
    expect(sccCount).toBe(1);
  });
});
