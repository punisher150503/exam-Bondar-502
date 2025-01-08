const { arraySize, validate, validateIndex, resize } = require('./variant8');

describe('arraySize', () => {
  test('повертає розмір одномірного масиву', () => {
    expect(arraySize([1, 2, 3])).toEqual([3]);
  });

  test('повертає розмір двовимірного масиву', () => {
    expect(arraySize([[1, 2], [3, 4]])).toEqual([2, 2]);
  });

  test('повертає розмір тривимірного масиву', () => {
    expect(arraySize([[[1]], [[2]]])).toEqual([2, 1, 1]);
  });

  test('повертає порожній масив для скаляра', () => {
    expect(arraySize(42)).toEqual([]);
  });

  test('повертає коректний розмір для порожнього масиву', () => {
    expect(arraySize([])).toEqual([0]);
  });
});

describe('validate', () => {
  test('валідний одномірний масив', () => {
    expect(() => validate([1, 2, 3], [3])).not.toThrow();
  });

  test('валідний багатовимірний масив', () => {
    expect(() => validate([[1, 2], [3, 4]], [2, 2])).not.toThrow();
  });

  test('некоректний розмір для одномірного масиву', () => {
    expect(() => validate([1, 2], [3])).toThrow();
  });

  test('валідний скаляр', () => {
    expect(() => validate(42, [])).not.toThrow();
  });

  test('некоректний масив для скаляра', () => {
    expect(() => validate([1, 2, 3], [])).toThrow();
  });
});

describe('validateIndex', () => {
  test('валідний індекс в межах масиву', () => {
    expect(() => validateIndex(2, 5)).not.toThrow();
  });

  test('індекс менший за нуль', () => {
    expect(() => validateIndex(-1, 5)).toThrow();
  });

  test('індекс більший або дорівнює довжині масиву', () => {
    expect(() => validateIndex(5, 5)).toThrow();
  });

  test('невалідний тип індексу', () => {
    expect(() => validateIndex('a', 5)).toThrow();
  });
});

describe('resize', () => {
  test('збільшення розміру одномірного масиву', () => {
    const array = [1, 2, 3];
    expect(resize(array, [5], 0)).toEqual([1, 2, 3, 0, 0]);
  });

  test('зменшення розміру масиву', () => {
    const array = [1, 2, 3];
    expect(resize(array, [2])).toEqual([1, 2]);
  });

  test('додавання нового виміру', () => {
    const array = [1, 2, 3];
    expect(resize(array, [3, 2], null)).toEqual([[1, null], [2, null], [3, null]]);
  });

  test('зміна розміру багатовимірного масиву', () => {
    const array = [[1, 2], [3, 4]];
    expect(resize(array, [3, 3], 0)).toEqual([[1, 2, 0], [3, 4, 0], [0, 0, 0]]);
  });

  test('порожній масив', () => {
    const array = [];
    expect(resize(array, [2, 2], 1)).toEqual([[1, 1], [1, 1]]);
  });

  test('некоректні розміри', () => {
    expect(() => resize([1, 2, 3], [-1])).toThrow();
  });
});
