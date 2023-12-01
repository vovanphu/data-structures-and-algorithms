import { Graph } from './graph.class.deprecated';

describe('Graph.class.ts', () => {
  test('dfsRecursive', () => {
    const graph = new Graph(10);
    graph.addEdge(0, 3);
    graph.addEdge(0, 2);
    graph.addEdge(3, 1);

    const result: number[] = [];
    const validResults = [
      [0, 2, 3, 1],
      [0, 3, 1, 2],
    ];

    graph.dfsRecursive(0, (v: number) => result.push(v));

    expect(result).toBeOneOf(validResults);
  });

  test('dfsIterative', () => {
    const graph = new Graph(10);
    graph.addEdge(0, 3);
    graph.addEdge(0, 2);
    graph.addEdge(3, 1);

    const result: number[] = [];
    const validResults = [
      [0, 2, 3, 1],
      [0, 3, 1, 2],
    ];

    graph.dfsIterative(0, (v: number) => result.push(v));

    expect(result).toBeOneOf(validResults);
  });

  test('bfsRecursive', () => {
    const graph = new Graph(10);
    graph.addEdge(0, 3);
    graph.addEdge(0, 2);
    graph.addEdge(3, 1);

    const result: number[] = [];
    const validResults = [
      [0, 2, 3, 1],
      [0, 3, 2, 1],
    ];

    graph.bfsRecursive(0, (v: number) => result.push(v));

    expect(result).toBeOneOf(validResults);
  });

  test('bfsIterative', () => {
    const graph = new Graph(10);
    graph.addEdge(0, 3);
    graph.addEdge(0, 2);
    graph.addEdge(3, 1);

    const result: number[] = [];
    const validResults = [
      [0, 2, 3, 1],
      [0, 3, 2, 1],
    ];

    graph.bfsIterative(0, (v: number) => result.push(v));

    expect(result).toBeOneOf(validResults);
  });
});
