/**
 * Test sort
 */

import {
  comparatorLexic,
  comparatorNumeric,
  bubbleSort,
  mergeSort,
} from '../sort';

describe('Test helper function in helpers.js,', () => {
  test('Test bubbleSort on ascending order.', () => {
    const input = [
      ['Volvo', 'Ford', 'BMW', 'Mazda'],
      ['one', 'two', 'three', 'four', 'five', 'five'],
    ];

    const output = input.map((e) =>
      bubbleSort(e, comparatorLexic({ ignoreCase: true }))
    );

    const answerKey = [
      ['BMW', 'Ford', 'Mazda', 'Volvo'],
      ['five', 'five', 'four', 'one', 'three', 'two'],
    ];

    expect(output).toStrictEqual(answerKey);
  });

  test('Test mergeSort on ascending order.', () => {
    const input = [
      ['Volvo', 'Ford', 'BMW', 'Mazda'],
      ['one', 'two', 'three', 'four', 'five', 'five'],
    ];

    const output = input.map((e) => mergeSort(e, comparatorLexic()));

    const answerKey = [
      ['BMW', 'Ford', 'Mazda', 'Volvo'],
      ['five', 'five', 'four', 'one', 'three', 'two'],
    ];

    expect(output).toStrictEqual(answerKey);
  });

  test('Test mergeSort on ascending order.', () => {
    const input = [[6, 5, 6, 1, 2, 3, 0, 4]];

    const output = input.map((e) => mergeSort(e, comparatorNumeric()));

    const answerKey = [[0, 1, 2, 3, 4, 5, 6, 6]];

    expect(output).toStrictEqual(answerKey);
  });
});
