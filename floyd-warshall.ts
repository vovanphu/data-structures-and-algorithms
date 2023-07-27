export function floydWarshall(
  graph: number[][],
  next: number[][] = [],
): number[][] {
  const dp: number[][] = Array(graph.length)
    .fill(null)
    .map(() => Array(graph.length).fill(Infinity));
  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph.length; j++) {
      if (!next[i]) next[i] = Array(graph.length);
      next[i][j] = j;
      dp[i][j] = graph[i][j];
    }
  }
  for (let k = 0; k < graph.length; k++) {
    for (let i = 0; i < graph.length; i++) {
      for (let j = 0; j < graph.length; j++) {
        if (dp[i][k] + dp[k][j] < dp[i][j]) {
          next[i][j] = next[i][k];
          dp[i][j] = dp[i][k] + dp[k][j];
        }
      }
    }
  }
  for (let k = 0; k < graph.length; k++) {
    for (let i = 0; i < graph.length; i++) {
      for (let j = 0; j < graph.length; j++) {
        if (dp[i][k] + dp[k][j] < dp[i][j]) {
          next[i][j] = -1;
          dp[i][j] = -Infinity;
        }
      }
    }
  }
  return dp;
}
