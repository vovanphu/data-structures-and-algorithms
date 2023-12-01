import { Graph } from '@root/data-structures';

export interface DfsStrategy_Interface {
  execute: (graph: Graph, startingVertex: number, callback: Function) => void;
}
