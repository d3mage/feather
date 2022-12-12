import { writeFile, loadFile } from './utils/file-interaction';
import { parseStructs } from './utils/parse';
import { generateTypes, generateHashingFunctions, generateTypehashes } from './signatures';

const main = async () => {
  const file = await loadFile('./contracts/Structs.sol');
  await writeFile('./output/solidity/Structs.sol', file);
  //todo: const solidityVersion = parseSolidityVersion(file);
  const structs = parseStructs(file);
  //todo: check if output folders exist
//   const types = generateTypes(structs);
//   await writeFile('./output/typescript/types.ts', types);
    // const typehashes = generateTypehashes(structs);
    // await writeFile('./output/solidity/Typehashes.sol', typehashes);
  const hashingFunctions = generateHashingFunctions(structs);
  await writeFile('./output/solidity/RecoverSigner.sol', hashingFunctions);
};

main();
