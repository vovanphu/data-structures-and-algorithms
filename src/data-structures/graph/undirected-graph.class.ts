import { Graph } from './graph.class';

export class UndirectedGraph extends Graph {
  set(source: number, destination?: number, weight?: number | undefined): void {
    super.set(source, destination, weight);
    
    if (destination !== undefined) {
      this.graphStorage.setEdge(destination, source, weight);
    }
  }
}
