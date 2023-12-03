import { gridShortestPath } from './grid-shortest-path';

describe('gridShortestPath', () => {
  test('shortest path avaiable', () => {
    const dungeon = [
      ['s', '.', '.', '.'],
      ['.', 'x', '.', '.'],
      ['.', 'x', '.', '.'],
      ['.', 'x', 'e', '.'],
    ];

    const expectedResult = 5;
    const result = gridShortestPath(dungeon);

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
    const result = gridShortestPath(dungeon);

    expect(result).toBe(expectedResult);
  });

  test('handle start from somewhere else', () => {
    const dungeon = [
      ['.', '.', 's', '.'],
      ['.', 'x', 'x', '.'],
      ['.', 'x', '.', '.'],
      ['.', 'x', 'e', '.'],
    ];

    const expectedResult = 5;
    const result = gridShortestPath(dungeon, 0, 2);

    expect(result).toBe(expectedResult);
  });

  test('handle start at the end', () => {
    const dungeon = [
      ['.', '.', '.', '.'],
      ['.', 'x', 'x', '.'],
      ['.', 'x', '.', '.'],
      ['.', 'x', 'e', '.'],
    ];

    const expectedResult = 0;
    const result = gridShortestPath(dungeon, 3, 2);

    expect(result).toBe(expectedResult);
  });
});
