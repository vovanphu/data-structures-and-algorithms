import { UndirectedGraph } from '@root/data-structures';
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

    // Expect the result to be the minimum cycle distance (0 -> 1 -> 3 -> 2 -> 0)
    expect(shortestCycle).toEqual([0, 1, 3, 2, 0]);
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

    // Expect the result to be the minimum cycle distance (0 -> 1 -> 3 -> 2 -> 4 -> 0)
    expect(shortestCycle).toEqual([0, 1, 2, 3, 4, 0]);
  });
});
