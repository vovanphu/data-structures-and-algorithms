import { DirectedGraph, UndirectedGraph } from '@root/data-structures';
import { heldKarp } from './held-karp';

describe('Held-Karp Algorithm', () => {
  test('Shortest Hamiltonian cycle in a small graph', () => {
    // Sample graph with 4 vertices (0, 1, 2, 3) and edge weights
    const graph = new UndirectedGraph([
      [0, 1, 10],
      [0, 2, 15],
      [0, 3, 20],
      [1, 2, 35],
      [1, 3, 25],
      [2, 3, 30],
    ]);

    // Calculate the shortest Hamiltonian cycle starting from vertex 0
    const shortestCycle = heldKarp(graph, 0);

    // Expect the result to be the minimum cycle distance
    // (0 -> 2 -> 3 -> 1 -> 0)
    // (0 -> 1 -> 3 -> 2 -> 0)
    const expectedResults = [
      [0, 1, 3, 2, 0],
      [0, 2, 3, 1, 0],
    ];

    expect(shortestCycle).toBeOneOf(expectedResults);
  });

  test('Shortest Hamiltonian cycle in a larger graph', () => {
    // Sample graph with 5 vertices (0, 1, 2, 3, 4) and edge weights
    const graph = new UndirectedGraph([
      [0, 1, 20],
      [0, 2, 42],
      [0, 3, 25],
      [0, 4, 30],
      [1, 2, 30],
      [1, 3, 34],
      [1, 4, 42],
      [2, 3, 10],
      [2, 4, 24],
      [3, 4, 30],
    ]);

    // Calculate the shortest Hamiltonian cycle starting from vertex 0
    const shortestCycle = heldKarp(graph, 0);

    // Expect the result to be the minimum cycle distance
    // (0 -> 1 -> 3 -> 2 -> 4 -> 0)
    // (0 -> 4 -> 2 -> 3 -> 1 -> 0)
    const expectedResults = [
      [0, 1, 3, 2, 4, 0],
      [0, 4, 2, 3, 1, 0],
    ];

    expect(shortestCycle).toBeOneOf(expectedResults);
  });

  test('Shortest Hamiltonian cycle in a directed complete graph', () => {
    const graph = new DirectedGraph([
      [0, 1, 11],
      [0, 2, 7],
      [0, 3, 33],
      [1, 0, 26],
      [1, 2, 25],
      [1, 3, 17],
      [2, 0, 12],
      [2, 1, 31],
      [2, 3, 35],
      [3, 0, 24],
      [3, 1, 10],
      [3, 2, 30],
    ]);

    // Calculate the shortest Hamiltonian cycle starting from vertex 0
    const shortestCycle = heldKarp(graph);

    // Expect the result to be the minimum cycle distance (0 -> 1 -> 3 -> 2 -> 0)
    expect(shortestCycle).toEqual([0, 1, 3, 2, 0]);
  });
});
