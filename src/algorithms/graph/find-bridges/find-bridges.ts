import { UndirectedGraph } from '@root/data-structures';

/**
 * Return an array contains bridge edges if found any.
 * @param graph Undirected Graph
 * @returns Array contains bridge edges
 *
 * Works by tracking discovery timestamp id and lowest reachable id
 * durring dfs for each vertex, bridges appear where target lowest reachable
 * is smaller than the current discovery timestamp id.
 */
export function findBridges(graph: UndirectedGraph): number[][] {
  // Variable for the result
  const bridges: number[][] = [];

  // Variables for tracking
  let id = 0;
  // Timestamp ids record discovery time
  const ids: number[] = Array.from({ length: graph.size() });
  // The lowest links of vertices in the graph
  const lows: number[] = Array.from({ length: graph.size() });

  // Variable for traversing
  const visited: boolean[] = Array.from({ length: graph.size() }, () => false);

  // Declare the algorithm for traversing and tracking
  // The `parent` variable help us ignore the vertex we come
  // from while collecting low-link from a visited vertex
  // (which is a neighbor, means reachable and has a timestamp id)
  const dfs = (vertex: number, parent?: number | undefined) => {
    if (visited[vertex]) return;

    visited[vertex] = true;
    ids[vertex] = lows[vertex] = id++;

    for (const neighbor of graph.neighbors(vertex)) {
      // Ignore the vertex we come from
      if (neighbor === parent) continue;

      // Reach a visited vertex, this reachable vertex has a chance
      // to have a smaller discovery time id than current low-link index
      if (visited[neighbor] === true) {
        lows[vertex] = Math.min(lows[vertex], ids[neighbor]);
      } else {
        // Continue perform dfs on unvisited vertices
        dfs(neighbor, vertex);

        // After dfs, compare and update current vertex low-link with neighbor
        lows[vertex] = Math.min(lows[vertex], lows[neighbor]);

        // At this point, we can compare current id with neighbor low-link
        // to detect if this edge is a bridge
        // (since neighbor low-link was already updated durring its dfs)
        if (ids[vertex] < lows[neighbor]) {
          bridges.push([vertex, neighbor]);
        }
      }
    }
  };

  // Loop through every vertices to make sure connected components
  // are proccessed properly
  for (let i = 0; i < graph.size(); i++) {
    dfs(i);
  }

  return bridges;
}
