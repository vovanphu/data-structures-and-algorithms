import { DirectedGraph } from '@root/data-structures';

export interface FindAugmentingPathStrategy_Interface {
  execute(residual: DirectedGraph, start: number, end: number): number[];
}
