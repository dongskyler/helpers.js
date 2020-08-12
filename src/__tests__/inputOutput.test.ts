/**
 * Test inputOutput
 */

import path from 'path';
import { listFilesInDirSync, loadFile } from '../inputOutput';

describe('Test inputOutput', () => {
  test('Test listFilesInDirSync', () => {
    const input = path.resolve(__dirname, 'testCases');
    const output = listFilesInDirSync(input);
    const answerKey = ['sample.txt'];
    expect(output).toEqual(answerKey);
  });

  test('Test loadFile', async () => {
    const input = path.resolve(__dirname, 'testCases', 'sample.txt');
    const output = await loadFile(input);
    const answerKey = 'Sample\n';
    expect(output).toEqual(answerKey);
  });
});
