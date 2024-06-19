import { UndirectedGraph } from '@root/data-structures';

/**
 * Function return articulation points in a graph
 * @param graph
 * @returns An array determine if a vertex is an articulation point or not
 *
 * Works by tracking discovery timestamp id and low-link similar to find bridges.
 * But use extra conditions to find articulation points
 * - Find articulation point using out going edges
 * - Find articulation point using bridges
 * - Find articulation point using cycles
 */
export function findArticulationPoints(graph: UndirectedGraph): boolean[] {
  // Variable for the result
  const articulationPoints: boolean[] = Array.from(
    { length: graph.size() },
    () => false,
  );

  // Variables for tracking
  let id = 0;
  // Timestamp ids record discovery time
  const ids: number[] = Array.from({ length: graph.size() });
  // The lowest links of vertices in the graph
  const lowLinks: number[] = Array.from({ length: graph.size() });

  // Variable for traversing
  const visited: boolean[] = Array.from({ length: graph.size() }, () => false);

  const dfs = (vertex: number, parent?: number | undefined) => {
    visited[vertex] = true;
    ids[vertex] = lowLinks[vertex] = id++;

    let outEdges = 0;

    // Declare the algorithm for traversing and tracking
    // The `parent` variable help us ignore the vertex we come
    // `parent` also help us determine a starting point by checking `undefined`
    for (const neighbor of graph.neighbors(vertex)) {
      // Ignore the vertex we come from
      if (neighbor === parent) continue;

      // Reach a visited vertex, this reachable vertex has a chance
      // to have a smaller discovery time id than current low-link index
      if (visited[neighbor] === true) {
        lowLinks[vertex] = Math.min(lowLinks[vertex], ids[neighbor]);
      } else {
        // Update out going edge count
        outEdges++;

        // Continue perform dfs on unvisited vertices
        dfs(neighbor, vertex);

        // After dfs, compare and update current vertex low-link with neighbor
        lowLinks[vertex] = Math.min(lowLinks[vertex], lowLinks[neighbor]);

        // Find articulation point using out going edges
        // Starting point which have no parent vertex is a articulation point
        // if it has more than 1 out going edges
        if (parent === undefined && outEdges > 1) {
          articulationPoints[vertex] = true;
        }

        // Find articulation point using bridges
        // For non-starting vertex, it is an articulation point
        // if it has a bridge in its edges
        if (parent !== undefined && ids[vertex] < lowLinks[neighbor]) {
          articulationPoints[vertex] = true;
        }

        // Find articulation point using cycles
        // A Vertex is an articulation point
        // if it connected to another component (has `parent`)
        // and it start a cycle
        if (parent !== undefined && ids[vertex] === lowLinks[neighbor]) {
          articulationPoints[vertex] = true;
        }
      }
    }
  };

  // Loop through every vertices to make sure connected components
  // are proccessed properly
  for (let i = 0; i < graph.size(); i++) {
    if (visited[i] === true) continue;
    dfs(i);
  }

  return articulationPoints;
}
