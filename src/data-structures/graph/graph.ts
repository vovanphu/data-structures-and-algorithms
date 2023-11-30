import {
  GraphStorage_Interface,
  AdjacencyList_GraphStorage,
} from '@root/data-structures';

export class Graph {
  constructor(
    edgesList?: Array<Array<number>>,
    private graphStorage: GraphStorage_Interface = new AdjacencyList_GraphStorage(),
  ) {
    if (edgesList !== undefined) {
      this.sets(edgesList);
    }
  }

  sets(edgesList: Array<Array<number>>): void {
    for (let i = 0; i < edgesList.length; i++) {
      const edge = edgesList[i];
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
}
