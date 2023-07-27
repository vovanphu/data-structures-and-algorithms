import { bfsGridShortestPath } from './bfs-grid-shortest-path';

describe('bfsGridShortestPath', () => {
  test('shortest path avaiable', () => {
    const dungeon = [
      ['s', '.', '.', '.'],
      ['.', 'x', '.', '.'],
      ['.', 'x', '.', '.'],
      ['.', 'x', 'e', '.'],
    ];

    const expectedResult = 5;
    const result = bfsGridShortestPath(dungeon);

    expect(result).toBe(expectedResult);
  });

  test('shortest path unavaiable', () => {
    const dungeon = [
      ['s', '.', '.', '.'],
      ['.', 'x', 'x', 'x'],
      ['.', 'x', '.', '.'],
      ['.', 'x', 'e', '.'],
    ];

    const expectedResult = -1;
    const result = bfsGridShortestPath(dungeon);

    expect(result).toBe(expectedResult);
  });
});
