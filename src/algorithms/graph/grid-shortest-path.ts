import { Queue } from '@root/data-structures';

export function gridShortestPath(
  grid: string[][],
  startingRow: number = 0,
  startingColumn: number = 0,
): number {
  // Grid sizes
  const R = grid.length;
  const C = R === 0 ? 0 : grid[0].length;

  // Base cases
  if (
    startingRow < 0 ||
    startingRow >= R ||
    startingColumn < 0 ||
    startingColumn >= C
  ) {
    throw new Error('Out of grid bound');
  }

  // Variables used for counting
  let count = 0;
  let stepsInCurrentLayer = 0;
  let stepsInNextLayer = 0;

  // Navigation vectors (up, right, down, left)
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  // Variables used for traversing
  const qr: Queue<number> = new Queue();
  const qc: Queue<number> = new Queue();
  const visited: boolean[][] = new Array(R)
    .fill(undefined)
    .map(() => new Array(C).fill(false));

  qr.enqueue(startingRow);
  qc.enqueue(startingColumn);
  stepsInCurrentLayer = 1;

  while (qr.size() > 0) {
    // Dequeue to get the current location
    const r = qr.dequeue() as number;
    const c = qc.dequeue() as number;
    stepsInCurrentLayer--;

    // Ignore visited location
    if (visited[r][c]) continue;
    visited[r][c] = true;

    // Return on success
    if (grid[r][c] === 'e') return count;

    // Try to navigate neighbors
    for (let i = 0; i < dr.length; i++) {
      // Neighbor location
      const rr = r + dr[i];
      const cc = c + dc[i];

      // Ignore invalid location
      if (rr < 0 || rr >= R) continue;
      if (cc < 0 || cc >= C) continue;

      // Check on obstacle
      if (grid[r][c] === 'x') continue;

      // Add more location to the queue
      qr.enqueue(rr);
      qc.enqueue(cc);
      stepsInNextLayer++;
    }

    // Counting
    if (stepsInCurrentLayer === 0) {
      stepsInCurrentLayer = stepsInNextLayer;
      stepsInNextLayer = 0;
      count++;
    }
  }

  return -1;
}
