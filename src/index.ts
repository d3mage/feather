import { writeFile, loadFile } from './utils/file-interaction';
import { parseStructs } from './utils/parse';
import { generateTypes, generateHashingFunctions } from './signatures';

const main = async () => {
  const file = await loadFile('./contracts/Structs.sol');
  //todo: const solidityVersion = parseSolidityVersion(file);
  const structs = parseStructs(file);
  //todo: check if folders exist
  const types = generateTypes(structs);
  await writeFile('./output/typescript/types.ts', types);

  const hashingFunctions = generateHashingFunctions(structs);
  await writeFile('./output/solidity/StructHasher.sol', hashingFunctions);
};

main();
