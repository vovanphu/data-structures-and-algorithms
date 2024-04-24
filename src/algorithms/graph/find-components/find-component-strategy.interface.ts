import { Graph } from '@root/data-structures';

export interface FindComponentsStrategy_Interface {
  execute(graph: Graph): Array<Array<number>>;
}
