import { heldKarp } from './held-karp';

describe('Held-Karp Algorithm', () => {
  test('Shortest Hamiltonian cycle in a small graph', () => {
    // Sample graph with 4 vertices (0, 1, 2, 3) and edge weights
    const graph = [
      [0, 10, 15, 20],
      [10, 0, 35, 25],
      [15, 35, 0, 30],
      [20, 25, 30, 0],
    ];

    // Calculate the shortest Hamiltonian cycle starting from vertex 0
    const shortestCycle = heldKarp(graph, 0);

    // Expect the result to be the minimum cycle distance (0 -> 1 -> 3 -> 2 -> 0)
    expect(shortestCycle).toEqual([0, 1, 3, 2, 0]);
  });

  test('Shortest Hamiltonian cycle in a larger graph', () => {
    // Sample graph with 5 vertices (0, 1, 2, 3, 4) and edge weights
    const graph = [
      [0, 20, 42, 25, 30],
      [20, 0, 30, 34, 42],
      [42, 30, 0, 10, 24],
      [25, 34, 10, 0, 30],
      [30, 42, 24, 30, 0],
    ];

    // Calculate the shortest Hamiltonian cycle starting from vertex 0
    const shortestCycle = heldKarp(graph, 0);

    // Expect the result to be the minimum cycle distance (0 -> 1 -> 3 -> 2 -> 4 -> 0)
    expect(shortestCycle).toEqual([0, 1, 2, 3, 4, 0]);
  });
});
