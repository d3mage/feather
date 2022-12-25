import { writeFile, loadFile } from './utils/file-interaction';
import { parseStructs } from './utils/parse';
import {
  generateTypes,
  generateEIP712Base,
  generateTypehashes,
  generateSignMessage,
} from './signatures';
import { generateTest } from './signatures/generate-test';

const main = async () => {
  const file = await loadFile('./contracts/Structs.sol');
  //todo: const solidityVersion = parseSolidityVersion(file);
  const structs = parseStructs(file);
  //todo: check if output folders exist
  const typehashes = generateTypehashes(structs);
  await writeFile('./contracts/Typehashes.sol', typehashes);
  const hashingFunctions = generateEIP712Base(structs);
  await writeFile('./contracts/EIP712Base.sol', hashingFunctions);
  const types = generateTypes(structs);
  await writeFile('./test/types.ts', types);
  const signingFunctions = generateSignMessage(structs);
  await writeFile('./test/sign-message.ts', signingFunctions);
  const test = generateTest(structs);
  await writeFile('./test/eip712.spec.ts', test);
};

main();
