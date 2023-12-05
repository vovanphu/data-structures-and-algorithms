import { DirectedGraph } from '@root/data-structures';
import { topSort } from './top-sort';

const mockExecute = jest.fn();
const MockTopSortStrategy = jest.fn(() => {
  return {
    execute: mockExecute,
  };
});

beforeEach(() => {
  jest.mocked(MockTopSortStrategy).mockClear();
});

describe('topSort', () => {
  test('should create strategy instance once', () => {
    const graph = new DirectedGraph();
    topSort(graph, MockTopSortStrategy);

    expect(jest.mocked(MockTopSortStrategy)).toHaveBeenCalledOnce();
  });

  test('should invoke method with right parameters', () => {
    const graph = new DirectedGraph();
    topSort(graph, MockTopSortStrategy);

    expect(mockExecute).toHaveBeenCalledWith(graph);
  });
});
