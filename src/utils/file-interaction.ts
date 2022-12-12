import { promises as fs } from 'fs';

export const loadFile = async (path: string) => {
  const file = await fs.readFile(path);
  return file.toString();
};

export const writeFile = async (path: string, fileString: string) => {
  await fs.writeFile(path, fileString);
};
