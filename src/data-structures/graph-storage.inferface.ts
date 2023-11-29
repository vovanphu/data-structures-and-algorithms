export interface GraphStorage_Interface {
  size: () => number;

  setEdge: (source: number, destination: number, weight?: number) => void;

  neighbors: (vertex: number) => number[];

  weight?: (source: number, destination: number) => number;
}
