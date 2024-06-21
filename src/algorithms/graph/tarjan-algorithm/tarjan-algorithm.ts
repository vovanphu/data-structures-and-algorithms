import { DirectedGraph } from '@root/data-structures';

/**
 * The algorithm find strongly connected components
 * in a directed graph
 * If `v` and `u` belong to the same strongly connected component,
 * there always a path from `v` to `u` and vice versa
 *
 * An excellent explaination on this algorithm:
 * https://codeforces.com/blog/entry/71146
 * @param graph
 * @returns
 */
export function tarjanAlgorithm(graph: DirectedGraph): number[][] {
  // Variable for traversal
  const visited: boolean[] = Array.from({ length: graph.size() }, () => false);

  // Low link value variables
  const ids: number[] = Array.from({ length: graph.size() });
  const lowLinks: number[] = Array.from({ length: graph.size() });

  // Tracking dfs variables,
  // The stack used for tracking current dfs path and vertex order in scc
  // The onStack is a useful variable to quickly check scc membership
  const stack: number[] = [];
  const onStack: Set<number> = new Set();

  // Variables for result
  const sccs: number[][] = [];
  let id = 0;

  // During DFS, tracking low link values, and on stack vertices
  const dfs = (start: number) => {
    if (visited[start]) return;

    visited[start] = true;
    ids[start] = lowLinks[start] = id++;
    stack.push(start);
    onStack.add(start);

    for (const neighbor of graph.neighbors(start)) {
      if (visited[neighbor]) {
        // Try to update low link value if vertex is on stack
        if (onStack.has(neighbor)) {
          lowLinks[start] = Math.min(lowLinks[start], ids[neighbor]);
        }
      } else {
        dfs(neighbor);

        // Update the low link base on the neighbor low link
        lowLinks[start] = Math.min(lowLinks[start], lowLinks[neighbor]);
      }
    }

    // Check if the start vertex is the start of a strongly connected component
    // after visit all its neighbors
    if (ids[start] === lowLinks[start]) {
      const component = [];

      // Continuesly pop vertices from the stack until reach the start vertex
      // gives vertices of a strongly connected component
      while (stack.length > 0) {
        const vertext = stack.pop() as number;
        component.push(vertext);
        onStack.delete(vertext);
        if (vertext === start) break;
      }

      // Out put the strongly connected component
      sccs.push(component.reverse());
    }
  };

  for (let i = 0; i < graph.size(); i++) {
    if (visited[i]) continue;
    dfs(i);
  }

  return sccs;
}
