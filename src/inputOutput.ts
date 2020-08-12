/**
 * Input output operations
 */

import fs from 'fs';

/**
 * Return an array of filenames in a directory.
 * Optionally, you can specific an extension
 * @param dir Path to directory.
 * @param ext (Optional) Filter by file extension.
 * @param removeExt (Optional) Remove the file extension from the filename string.
 */
const listFilesInDirSync = (
  dir: string,
  {
    ext = null,
    removeExt = false,
  }: { ext?: string | null; removeExt?: boolean } = {}
): string[] | null => {
  if (typeof dir !== 'string') {
    throw new TypeError("Argument 'dir' must be a string.");
  }

  if (ext !== null && typeof ext !== 'string') {
    throw new TypeError("Argument 'ext' must be a string.");
  }

  if (typeof removeExt !== 'boolean') {
    throw new TypeError("Argument 'removeExt' must be a boolean.");
  }

  if (!fs.existsSync(dir)) {
    throw new ReferenceError('Directory does not exist.');
  }

  const fileList = fs.readdirSync(dir);

  if (!removeExt) {
    // Don't remove file extensions
    if (ext === null) {
      // Don't filter by file extension
      return fileList;
    }
    // Filter by file extension
    return fileList.filter((fileName) => fileName.lastIndexOf(ext) >= 0);
  }

  // Remove file extensions
  if (ext === null) {
    // Remove all extensions
    const regexRemoveExt = /^(?:.+?)(?:\.[^.]*$|$)/;
    const filteredList = fileList.map((e) => e.match(regexRemoveExt));
    if (filteredList === null) {
      return null;
    }
    return filteredList[0];
  }

  // Filter by extension and remove file extensions
  return fileList
    .filter((filename) => filename.lastIndexOf(ext) >= 0)
    .map((fileName) => fileName.substr(0, fileName.lastIndexOf(ext)));
};

/**
 * Loading a file to stream buffer
 * @param filePath Path to file
 */
const loadFile = (filePath: string): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    if (typeof filePath !== 'string') {
      reject(new TypeError("Argument 'filePath' must be a string."));
      return;
    }

    const stream = fs.createReadStream(filePath);
    stream
      .on('data', (buffer) => {
        resolve(buffer.toString());
      })
      .on('error', (err) => {
        reject(err);
      });
  });

/**
 * Read a file and write its content to another file
 * @param fileToRead Path to the file to be read
 * @param fileToWrite Path to the file to be written
 */
const readPipeWrite = (
  fileToRead: string,
  fileToWrite: string
): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    if (typeof fileToRead !== 'string') {
      reject(new TypeError("Argument 'fileToRead' must be a string."));
      return;
    }
    if (typeof fileToWrite !== 'string') {
      reject(new TypeError("Argument 'fileToWrite' must be a string."));
      return;
    }

    const readStream = fs.createReadStream(fileToRead).on('error', (err) => {
      reject(err);
    });
    const writeStream = fs.createWriteStream(fileToWrite).on('error', (err) => {
      reject(err);
    });
    readStream.pipe(writeStream).on('finish', () => {
      resolve(
        `Successfully read ${fileToRead} and wrote its content to ${fileToWrite}.`
      );
    });
  });

/**
 * Write content to file
 * @param filePath Path to the file to be written
 * @param content Content to be written
 */
const writeToFile = (filePath: string, content: string): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    if (typeof content !== 'string') {
      reject(new Error("Argument 'content' must be a string."));
      return;
    }
    if (typeof filePath !== 'string') {
      reject(new Error("Argument 'filePath' must be a string."));
      return;
    }

    fs.writeFile(filePath, content, 'utf8', (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(`Successfully wrote to ${filePath}.`);
    });
  });

export { listFilesInDirSync, loadFile, readPipeWrite, writeToFile };
