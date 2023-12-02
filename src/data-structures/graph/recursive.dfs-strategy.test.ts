import { Graph } from './graph.class';
import { Recursive_DfsStrategy } from './recursive.dfs-strategy';

// Mock the Graph class
jest.mock('./graph.class');

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods
  jest.mocked(Graph).mockClear();
});

describe('Recursive_DfsStrategy', () => {
  const callback = jest.fn();
  const graph: Graph = new Graph();
  let edgeList: Record<string, Array<number>>;
  let dfsStrategy: Recursive_DfsStrategy;

  // Mock neighbors method
  jest
    .mocked(graph)
    .neighbors.mockImplementation((vertex: number): number[] => {
      return edgeList[String(vertex)] ?? [];
    });

  // Mock size method
  jest.mocked(graph).size.mockImplementation(() => {
    return Object.keys(edgeList).length;
  });

  beforeEach(() => {
    dfsStrategy = new Recursive_DfsStrategy();
  });

  test('should call neighbors method correctly', () => {
    /**
     *   1----3
     *  /
     * 0
     *  \
     *   2----4
     */
    edgeList = {
      '0': [1, 2],
      '1': [3],
      '2': [4],
    };

    dfsStrategy.execute(graph, 0, callback);

    // Expectations
    expect(callback).toHaveBeenCalledWith(0);
    expect(callback).toHaveBeenCalledWith(1);
    expect(callback).toHaveBeenCalledWith(3);
    expect(callback).toHaveBeenCalledWith(2);
    expect(callback).toHaveBeenCalledWith(4);
    expect(callback).toHaveBeenCalledTimes(5);
    expect(jest.mocked(graph).neighbors).toHaveBeenCalledWith(0);
    expect(jest.mocked(graph).neighbors).toHaveBeenCalledWith(1);
    expect(jest.mocked(graph).neighbors).toHaveBeenCalledWith(3);
    expect(jest.mocked(graph).neighbors).toHaveBeenCalledWith(2);
    expect(jest.mocked(graph).neighbors).toHaveBeenCalledWith(4);
  });

  test('should execute DFS correctly', () => {
    /**
     *   1----3----5
     *  /
     * 0----6
     *  \
     *   2----4
     */
    edgeList = {
      '0': [1, 6, 2],
      '1': [0, 3],
      '2': [0, 4],
      '3': [1, 5],
      '4': [2],
      '5': [3],
      '6': [0],
    };
    const output: number[] = [];
    const callback = jest.fn((vertex: number) => output.push(vertex));
    const validResults = [[0, 1, 3, 5, 6, 2, 4]];

    dfsStrategy.execute(graph, 0, callback);
    expect(output).toBeOneOf(validResults);
  });

  test('should handle graph with size 1', () => {
    edgeList = {
      '0': [],
    };
    const output: number[] = [];
    const callback = jest.fn((vertex: number) => output.push(vertex));
    const validResults = [[0]];

    dfsStrategy.execute(graph, 0, callback);
    expect(output).toBeOneOf(validResults);
  });
});
