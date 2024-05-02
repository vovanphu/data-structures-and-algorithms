import { reconstructPath } from './reconstruct-path';

describe('reconstructPath', () => {
  test('should handle negative vertex', () => {
    const prev: Array<number | undefined> = [1, 3, 2, 0, 5, 4, 8, 6, 7];
    expect(reconstructPath(prev, -1, 0)).toEqual([]);
    expect(reconstructPath(prev, 5, -2)).toEqual([]);
  });

  test('should return empty array on empty prev array', () => {
    const prev: Array<number | undefined> = [];
    expect(reconstructPath(prev, 0, 6)).toEqual([]);
  });

  test('should reconstruct valid path', () => {
    const prev: Array<number | undefined> = [undefined, 0, 1, 2, 3];
    expect(reconstructPath(prev, 0, 3)).toEqual([0, 1, 2, 3]);
  });

  test('should return empty array if could not reconstruct', () => {
    const prev: Array<number | undefined> = [undefined, 0, 1, 2, 3];
    expect(reconstructPath(prev, 0, 6)).toEqual([]);
  });
});
