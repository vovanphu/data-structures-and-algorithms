export interface GraphStorage_Interface {
  size: () => number;

  setVertex: (vertex: number) => void;

  setEdge: (source: number, destination: number, weight?: number) => void;

  neighbors: (vertex: number) => number[];

  weight: (source: number, destination: number) => number;
}
