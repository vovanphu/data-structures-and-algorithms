/**
 * Reconstruct the path from start to end in a graph
 * @param prev array of numbers representing the previous nodes in the path
 * @param start the starting node
 * @param end the ending node
 * @returns array of numbers representing the reconstructed path,
 * may return an empty array if the path is not reconstructable
 */
export function reconstructPath(
  prev: Array<number | undefined>,
  start: number,
  end: number,
): number[] {
  if (start < 0 || end < 0) return [];

  const reversed: number[] = [];
  let currentNode: number | undefined = end;

  while (currentNode !== undefined) {
    // Negative cycle
    if (currentNode === -1) {
      return [];
    }

    reversed.push(currentNode);
    if (currentNode === start) break;
    currentNode = prev[currentNode];
  }

  const path = reversed.reverse();

  if (path[0] === start) return path;
  return [];
}
