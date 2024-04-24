import { reconstructPath } from './reconstruct-path';

describe('reconstructPath', () => {
  test('should throw error on negative vertex', () => {
    const prev: Array<number | undefined> = [1, 3, 2, 0, 5, 4, 8, 6, 7];
    expect(() => reconstructPath(prev, -1, 0)).toThrowError(
      'Negative vertex is not supported',
    );
    expect(() => reconstructPath(prev, 5, -2)).toThrowError(
      'Negative vertex is not supported',
    );
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
