/**
 * Test sort
 */

import { expect } from 'chai';
import {
  comparatorLexic,
  comparatorNumeric,
  bubbleSort,
  mergeSort,
  partialSort,
} from '../sort';

describe('Test sort', () => {
  it('Test bubbleSort on ascending lexicographical order.', () => {
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

    expect(output).to.deep.equal(answerKey);
  });

  it('Test bubbleSort on decending lexicographical order.', () => {
    const input = [
      ['Volvo', 'Ford', 'BMW', 'Mazda'],
      ['one', 'two', 'three', 'four', 'five', 'five'],
    ];

    const output = input.map((e) =>
      bubbleSort(e, comparatorLexic({ ignoreCase: true, descending: true }))
    );

    const answerKey = [
      ['Volvo', 'Mazda', 'Ford', 'BMW'],
      ['two', 'three', 'one', 'four', 'five', 'five'],
    ];

    expect(output).to.deep.equal(answerKey);
  });

  it('Test bubbleSort on ascending numerical order.', () => {
    const input = [[6, 5, 6, 1, 2, 3, 0, 4]];

    const output = input.map((e) => bubbleSort(e, comparatorNumeric()));

    const answerKey = [[0, 1, 2, 3, 4, 5, 6, 6]];

    expect(output).to.deep.equal(answerKey);
  });

  it('Test bubbleSort on decending numerical order.', () => {
    const input = [[6, 5, 6, 1, 2, 3, 0, 4]];

    const output = input.map((e) =>
      bubbleSort(e, comparatorNumeric({ descending: true }))
    );

    const answerKey = [[6, 6, 5, 4, 3, 2, 1, 0]];

    expect(output).to.deep.equal(answerKey);
  });

  it('Test mergeSort on ascending lexicographical order.', () => {
    const input = [
      ['Volvo', 'Ford', 'BMW', 'Mazda'],
      ['one', 'two', 'three', 'four', 'five', 'five'],
    ];

    const output = input.map((e) => mergeSort(e, comparatorLexic()));

    const answerKey = [
      ['BMW', 'Ford', 'Mazda', 'Volvo'],
      ['five', 'five', 'four', 'one', 'three', 'two'],
    ];

    expect(output).to.deep.equal(answerKey);
  });

  it('Test mergeSort on decending lexicographical order.', () => {
    const input = [
      ['Volvo', 'Ford', 'BMW', 'Mazda'],
      ['one', 'two', 'three', 'four', 'five', 'five'],
    ];

    const output = input.map((e) =>
      mergeSort(e, comparatorLexic({ ignoreCase: true, descending: true }))
    );

    const answerKey = [
      ['Volvo', 'Mazda', 'Ford', 'BMW'],
      ['two', 'three', 'one', 'four', 'five', 'five'],
    ];

    expect(output).to.deep.equal(answerKey);
  });

  it('Test mergeSort on ascending numerical order.', () => {
    const input = [[6, 5, 6, 1, 2, 3, 0, 4]];

    const output = input.map((e) => mergeSort(e, comparatorNumeric()));

    const answerKey = [[0, 1, 2, 3, 4, 5, 6, 6]];

    expect(output).to.deep.equal(answerKey);
  });

  it('Test mergeSort on decending numerical order.', () => {
    const input = [[6, 5, 6, 1, 2, 3, 0, 4]];

    const output = input.map((e) =>
      mergeSort(e, comparatorNumeric({ descending: true }))
    );

    const answerKey = [[6, 6, 5, 4, 3, 2, 1, 0]];

    expect(output).to.deep.equal(answerKey);
  });

  it('Test partialSort on ascending numerical order.', () => {
    const input = [[6, 5, 6, 1, 2, 3, 0, 4]];

    const output = input.map((e) => partialSort(e, comparatorNumeric(), 2));

    const answerKey = [[0, 1, 6, 5, 6, 2, 3, 4]];

    expect(output).to.deep.equal(answerKey);
  });

  it('Test partialSort on decending numerical order.', () => {
    const input = [[3, 5, 6, 1, 2, 3, 0, 4]];

    const output = input.map((e) =>
      partialSort(e, comparatorNumeric({ descending: true }), 2)
    );

    const answerKey = [[6, 5, 3, 4, 3, 1, 2, 0]];

    expect(output).to.deep.equal(answerKey);
  });
});
