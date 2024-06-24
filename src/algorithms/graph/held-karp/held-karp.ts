import { Graph } from '@root/data-structures';
/**
 * The algorithm solve Traveling Salesman Problem by
 * return The Hamiltonian cycle for `graph` input.
 *
 * Contructed by using dynamic programming.
 *
 * The algorithm's description and pseudocode can be found here:
 * https://en.wikipedia.org/wiki/Held%E2%80%93Karp_algorithm
 */

export function heldKarp(graph: Graph, start: number = 0): number[] {
  /**
   * Variable which contains the route,
   * the route is gonna constructed in reversed order
   */
  const route: number[] = [];

  /**
   * Variable for dynamic programming technique.
   *
   * `tabular[set][end]` is a 2d table in form `2^V * V`
   * (with V is the size of the graph (graph.size())),
   * (1 << graph.size() is a bitwise statement return a number equal to 2^graph.size()).
   * `set` is a binary number has `V` length, denote a set of vertices used for calculate the shortest distance.
   *
   * `tabular[set][end]` contains the shortest distance of the path goes from `start`,
   * pass through `set - {start, end}`, then goes to `end`,
   *
   * As default, use `Infinity` as the shorest distance since we didn't know any shortest path yet.
   */
  const tabular: number[][] = Array(1 << graph.size())
    .fill(null)
    .map(() => Array(graph.size()).fill(Infinity));

  /**
   * Generate base cases, includes all path goes from `start` to `end`
   * (with `end` is vertex in `V`)
   *
   * `(1 << start) | (1 << end)` i a bitwise statement return a binary number denote that the set is {start, end}.
   * The shortest distance is the direct distance from vertex `start` to `end` (`graph[start][end]`)
   */
  for (let end = 0; end < graph.size(); end++) {
    if (end === start) continue;
    tabular[(1 << start) | (1 << end)][end] = graph.get(start, end);
  }

  /**
   * For every possible `set` includes `V` vertices from `graph`,
   * calculate the minimum cost of the route goes from `start`,
   * pass through `set - {start, end}` with `end` is a vertex in `set` (not `start`).
   *
   * `tabular[set][end] = min(tabular[set - {end}][k] + graph[k][end]) with k in set`
   */
  for (let set = 0; set < 1 << graph.size(); set++) {
    if ((set & (1 << start)) === 0) continue; // `start` must be in `set`

    for (let end = 0; end < graph.size(); end++) {
      if ((set & (1 << end)) === 0 || end === start) continue; // `end` differents to `start` and must be in `set`

      for (let k = 0; k < graph.size(); k++) {
        // `k` differents to `start`, `end` and must be in `set`
        if ((set & (1 << k)) === 0 || k === end || k === start) continue;

        const prevSubset = set ^ (1 << end); // `prevSubset` is the `set - {end}`
        const prevDistance = tabular[prevSubset][k]; // Minimum cost from `start`, through `prevSubset - {start, k}`, to `k`
        const distance = prevDistance + graph.get(k, end); // Distance base on prev distance

        /**
         * Compare the minimum distance in tabular with new distance just calculated
         */
        tabular[set][end] = Math.min(distance, tabular[set][end]);
      }
    }
  }

  /**
   * Variable used for compare the minimal distance of each route goes from `start`,
   * pass through a set `set - {start, end}` in any order, reach `end`, and finally return to `start`.
   */
  let minDistance = Infinity;

  /**
   * Loop through every vertex `end` in `V` (graph.size()),
   * use the `tabular` computed ealier to find the minimum cost of the shortest Hamiltonian cycle.
   *
   * `(1 << graph.size()) - 1` is a binary statement returns a binary number denote a set `set`
   * includes all vertices from `V`
   */
  for (let end = 0; end < graph.size(); end++) {
    if (end === start) continue;

    const currDistance =
      tabular[(1 << graph.size()) - 1][end] + graph.get(end, start);

    minDistance = Math.min(currDistance, minDistance);
  }

  let lastIndex = start; // A pointer used for construct the route
  let subset = (1 << graph.size()) - 1; // Binary number denote `set` includes all vertices
  route.push(start); // The route begin with vertex `start`

  /**
   * Re-construct the Hamiltonian cycle using the `tabular` table calculated before.
   */
  for (let i = 0; i < graph.size(); i++) {
    if (i === start) continue;

    /**
     * Variable used for decide which is the prev vertex in the optimal path
     */
    let index = -1;

    /**
     * Find the previous vertex in the optimal path
     */
    for (let end = 0; end < graph.size(); end++) {
      // `k` differents to `start`, `end` and must be in `set`
      if (end === start || (subset & (1 << end)) === 0) continue;
      if (index === -1) index = end;

      // distance calculations based on the dynamic programming table and the graph's adjacency matrix
      const oldDist = tabular[subset][index] + graph.get(index, lastIndex);
      const newDist = tabular[subset][end] + graph.get(end, lastIndex);

      if (newDist < oldDist) {
        index = end;
      }
    }

    route.push(index); // Push `index` to the `route`
    lastIndex = index;
    subset = subset ^ (1 << index); // Remove `index` from the subset using a bitwise XOR operation
  }

  route.push(start); // The starting vertex start is added to the route to complete the Hamiltonian cycle
  route.reverse(); // The route array is reversed to get the correct order of the path from start to finish

  return route;
}
