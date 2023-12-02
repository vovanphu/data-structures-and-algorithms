import { AdjacencyList_GraphStorage } from './adjacency-list.graph-storage';
import { DfsStrategy_Interface } from './dfs-strategy.interface';
import { GraphStorage_Interface } from './graph-storage.inferface';
import { Recursive_DfsStrategy } from './recursive.dfs-strategy';

export class Graph {
  private graphStorage: GraphStorage_Interface;

  public dfsStrategy: new (...args: any[]) => DfsStrategy_Interface =
    Recursive_DfsStrategy;

  constructor(
    edgeList: Array<Array<number>> = [],
    graphStorage: GraphStorage_Interface = new AdjacencyList_GraphStorage(),
  ) {
    this.graphStorage = graphStorage;
    this.sets(edgeList);
  }

  sets(edgeList: Array<Array<number>>): void {
    for (let i = 0; i < edgeList.length; i++) {
      const edge = edgeList[i];
      const [source, destination, weight] = edge;

      if (source === undefined) continue;
      this.set(source, destination, weight);
    }
  }

  set(source: number, destination?: number, weight?: number | undefined): void {
    if (destination === undefined) this.graphStorage.setVertex(source);
    else this.graphStorage.setEdge(source, destination, weight);
  }

  get(source: number, destination: number): number {
    return this.graphStorage.weight(source, destination);
  }

  size(): number {
    return this.graphStorage.size();
  }

  neighbors(vertex: number): number[] {
    return this.graphStorage.neighbors(vertex);
  }

  dfs(startingVertex: number, callback: Function = () => {}): void {
    new this.dfsStrategy().execute(this, startingVertex, callback);
  }
}
