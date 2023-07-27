import { Graph } from './graph.class';

export function tarjanAlgorithm(graph: Graph): number {
  let sccCount = 0;
  const ids: number[] = [];
  const lowLinks: number[] = [];
  const visited: boolean[] = Array(graph.size()).fill(false);
  const stack: number[] = [];
  const onStack: Set<number> = new Set();
  let id = 0;
  const dfs = (start: number) => {
    visited[start] = true;
    ids[start] = lowLinks[start] = id++;
    stack.push(start);
    onStack.add(start);
    let sccFound = false;
    for (const neighbor of graph.neighbors(start)) {
      if (!visited[neighbor]) dfs(neighbor);
      if (onStack.has(neighbor))
        lowLinks[start] = Math.min(ids[start], lowLinks[neighbor]);
      if (ids[start] === lowLinks[neighbor]) {
        sccFound = true;
      }
    }
    if (sccFound) {
      sccCount++;
      while (stack.length > 0) {
        const vertext = stack.pop();
        if (vertext) onStack.delete(vertext);
        if (vertext === start) break;
      }
    }
  };
  for (let i = 0; i < graph.size(); i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }
  return sccCount;
}

/**
 * Some how the implements using pseudocode on wiki or
 * in the video is not working and a small modification
 * has be done so the test case work
 * need furthur investigation
 */

/**
 * An excellent explaination on this algorithm:
 * https://codeforces.com/blog/entry/71146
 */
