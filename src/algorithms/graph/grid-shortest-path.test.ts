import { gridShortestPath } from './grid-shortest-path';

describe('gridShortestPath', () => {
  test('shortest path avaiable', () => {
    const dungeon = [
      ['s', '.', '.', '.'],
      ['.', 'x', '.', '.'],
      ['.', 'x', '.', '.'],
      ['.', 'x', 'e', '.'],
    ];
    const expectedResult = [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
    ];

    const result = gridShortestPath(dungeon);
    expect(result).toEqual(expectedResult);
  });

  test('shortest path unavaiable', () => {
    const dungeon = [
      ['s', '.', '.', '.'],
      ['.', 'x', 'x', 'x'],
      ['.', 'x', '.', '.'],
      ['.', 'x', 'e', '.'],
    ];
    const expectedResult = undefined;

    const result = gridShortestPath(dungeon);
    expect(result).toEqual(expectedResult);
  });

  test('handle start from somewhere else', () => {
    const dungeon = [
      ['.', '.', 's', '.'],
      ['.', 'x', 'x', '.'],
      ['.', 'x', '.', '.'],
      ['.', 'x', 'e', '.'],
    ];
    const expectedResult = [
      [0, 2],
      [0, 3],
      [1, 3],
      [2, 3],
      [3, 3],
      [3, 2],
    ];

    const result = gridShortestPath(dungeon, 0, 2);
    expect(result).toEqual(expectedResult);
  });

  test('handle start at the end', () => {
    const dungeon = [
      ['.', '.', '.', '.'],
      ['.', 'x', 'x', '.'],
      ['.', 'x', '.', '.'],
      ['.', 'x', 'e', '.'],
    ];
    const expectedResult = [[3, 2]];

    const result = gridShortestPath(dungeon, 3, 2);
    expect(result).toEqual(expectedResult);
  });
});
