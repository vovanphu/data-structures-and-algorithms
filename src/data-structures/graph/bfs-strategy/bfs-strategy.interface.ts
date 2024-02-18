import { Graph } from '../graph.class';

export interface BfsStrategy_Interface {
  execute: (graph: Graph, startingVertex: number, callback: Function) => void;
}
