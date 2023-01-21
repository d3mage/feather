import {
  generateTypes,
  generateEIP712Base,
  generateTypehashes,
} from './signatures';
import { generateTest } from './signatures/generate-test';
import { loadFile, writeFile, parseStructs } from './utils';

export const main = async (filePath: string) => {
  const file = await loadFile(filePath);
  const structs = parseStructs(file);
  const typehashes = generateTypehashes(structs);
  await writeFile('./contracts/Typehashes.sol', typehashes);
  const hashingFunctions = generateEIP712Base(structs);
  await writeFile('./contracts/EIP712Base.sol', hashingFunctions);
  const types = generateTypes(structs);
  await writeFile('./test/types.ts', types);
  const test = generateTest(structs);
  await writeFile('./test/eip712.spec.ts', test);
};
