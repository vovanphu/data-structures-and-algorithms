import { Graph } from './graph.class';

export interface BfsStrategy {
  execute: (graph: Graph, startingVertex: number, callback: Function) => void;
}
