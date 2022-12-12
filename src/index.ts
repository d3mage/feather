import { writeFile, loadFile } from './utils/file-interaction';
import { join } from 'path';
import { parseStructs } from './utils/parse';
import { generateTypes } from './signatures/generate-eip712-types';

const main = async () => {
    const file = await loadFile(join(__dirname, '../contracts/Structs.sol'));
    const structs = parseStructs(file);
    const types = generateTypes(structs);
    await writeFile(join(__dirname, '../output/types.ts'), types);
}

main();