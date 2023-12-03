export function bfsGridShortestPath(dungeon: string[][]): number {
  const R = dungeon.length;
  const C = dungeon[0].length;

  // Define the direction vectors for top, right, down left:
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  // Queues
  const qr: number[] = [];
  const qc: number[] = [];

  let stepCount = 0;
  let stepsInCurrentLayer = 1;
  let stepsInNextLayer = 0;

  const visited: boolean[][] = Array.from({ length: R }, () =>
    new Array(C).fill(false),
  );

  qr.push(0);
  qc.push(0);
  visited[0][0] = true;

  while (qr.length > 0) {
    const r = qr.shift() as number;
    const c = qc.shift() as number;

    stepsInCurrentLayer--;

    if (dungeon[r][c] === 'e') {
      return stepCount;
    }

    for (let i = 0; i < dr.length; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (nr < 0 || nr >= R) continue;
      if (nc < 0 || nc >= C) continue;
      if (visited[nr][nc]) continue;
      if (dungeon[nr][nc] === 'x') continue;

      qr.push(nr);
      qc.push(nc);

      visited[nr][nc] = true;
      
      stepsInNextLayer++;
    }

    if (stepsInCurrentLayer === 0) {
      stepCount++;
      stepsInCurrentLayer = stepsInNextLayer;
      stepsInNextLayer = 0;
    }
  }

  return -1;
}
