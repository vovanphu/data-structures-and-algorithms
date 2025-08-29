import { DirectedGraph } from '@root/data-structures';

// [ ] TODO: Need to check if the graph is weakly connected

/**
 * Function to find eulerian path of a directed graph if it exist
 * The algorithm checks if a eulerian path exits using its properties,
 * then uses Hierholzer's algorithm to reconstruct the path
 * @param graph
 * @returns An array contains eulerian path or empty
 */
export function findEulerianPath(graph: DirectedGraph): number[] {
  // Base case for empty graph
  if (graph.size() === 0) return [];

  /**
   * Variable to store the result
   */
  const path: number[] = [];

  /**
   * Variable to store in degrees
   */
  const inDegrees: number[] = Array.from({ length: graph.size() }, () => 0);

  /**
   * Variable to store out degrees
   */
  const outDegrees: number[] = Array.from({ length: graph.size() }, () => 0);

  /**
   * Variable to cout graph's edges
   */
  let edgeCount = 0;

  // Loop through every edges in the graph to count in and out degree
  for (let vertex = 0; vertex < graph.size(); vertex++) {
    for (const neighbor of graph.neighbors(vertex)) {
      outDegrees[vertex]++;
      inDegrees[neighbor]++;
      edgeCount++;
    }
  }

  /**
   * Variable for checking vertices have out degree exeeding in degree
   */
  let outDegreeExceedIn = [];

  /**
   * Variable for checking vertices have in degree exeeding out degree
   */
  let inDegreeExceedOut = [];

  for (let vertex = 0; vertex < graph.size(); vertex++) {
    const outMinusIn = outDegrees[vertex] - inDegrees[vertex];
    const inMinusOut = inDegrees[vertex] - outDegrees[vertex];

    // If any vertex has out degree exceeding in degree more than 1, the graph can't have eulerian path
    // and vice versa
    if (outMinusIn > 1 || inMinusOut > 1) return [];

    // Check if there are any potential starting points for eulerian path by out degree - in degree
    if (outMinusIn === 1) outDegreeExceedIn.push(vertex);

    // Check if there are any potential starting points for eulerian path by in degree - out degree
    if (inMinusOut === 1) inDegreeExceedOut.push(vertex);
  }

  // Validate eulerian path existence by check number of valid starting points
  if (
    outDegreeExceedIn.length !== inDegreeExceedOut.length ||
    outDegreeExceedIn.length > 1
  )
    return []; // No eulerian path

  // Choose a valid starting point for eulerian path.
  // it may be any vertex has in and out degree different by 1,
  // or any vertex if all vertices in the graph have equal in and out degree

  /**
   * Variable for eulerian path starting point
   */
  const startVertex = outDegreeExceedIn.length > 0 ? outDegreeExceedIn[0] : 0;

  // Use Hierholzer's algorithm to reconstruct the eulerian path

  /**
   * Stack structure for traversing graph and backtracking from dead end
   */
  const stack: number[] = [];

  stack.push(startVertex);

  while (stack.length > 0) {
    const vertex = stack[stack.length - 1];
    const neighbors = graph.neighbors(vertex);

    if (outDegrees[vertex] > 0) {
      stack.push(neighbors[--outDegrees[vertex]]);
    } else {
      path.push(stack.pop() as number);
    }
  }

  if (path.length !== edgeCount + 1) return [];

  // The path contains eulerian path in reverse order (maybe not necessary)
  return path.reverse();
}
