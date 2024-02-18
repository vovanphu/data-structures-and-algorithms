import { Graph } from '../graph.class';

export interface DfsStrategy_Interface {
  execute: (graph: Graph, startingVertex: number, callback: Function) => void;
}
