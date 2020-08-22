/**
 * Test inputOutput
 */

import { expect } from 'chai';
import path from 'path';
import { listFilesInDirSync, loadFile } from '../inputOutput';

describe('Test inputOutput', () => {
  it('Test listFilesInDirSync', () => {
    const input = path.resolve(__dirname, 'testCases');
    const output = listFilesInDirSync(input);
    const answerKey = ['sample.txt'];
    expect(output).to.deep.equal(answerKey);
  });

  it('Test loadFile', async () => {
    const input = path.resolve(__dirname, 'testCases', 'sample.txt');
    const output = await loadFile(input);
    const answerKey = 'Sample\n';
    expect(output).to.deep.equal(answerKey);
  });
});
