import { Graph } from '@root/data-structures';

export function findComponents(graph: Graph): Array<Array<number>> {
  const visited: boolean[] = new Array(graph.size()).fill(false);
  let count = 0;
  const components: Array<Array<number>> = [];

  visited.forEach((isVisited, vertex) => {
    if (isVisited) return;

    graph.dfs(vertex, (v: number) => {
      visited[v] = true;

      if (components[count] === undefined) components[count] = [];
      components[count].push(v);
    });

    count++;
  });

  return components;
}
