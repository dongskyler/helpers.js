/**
 * Test others
 */

import { valOfKeysAndIndices } from '../others';

describe('Test helper function in helpers.js,', () => {
  test('Test valOfKeysAndIndices.', () => {
    const input: any[][] = [
      [{ key0: [{ key1: [3.142, 6.626] }] }, ['key0', 0, 'key1', 0]],
      [
        {
          key0: {
            key1: [{ key2: [3.142, 6.626, 'pie'] }],
          },
        },
        ['key0', 'key1', 0, 'key2', 2],
      ],
    ];

    const output = input.map((e) => valOfKeysAndIndices(e[0], ...e[1]));
    const answerKey = [3.142, 'pie'];
    expect(output).toStrictEqual(answerKey);
  });
});
