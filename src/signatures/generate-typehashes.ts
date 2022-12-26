import { ScrappedStruct } from '../types';
import { SOLIDITY_HEADER } from './shared';

export const extractTypehashes = (structs: ScrappedStruct[]) => {
  for(const struct of structs) {
    struct.typehash = `${struct.name.toUpperCase()}_TYPEHASH`;
  }
};

export const generateTypehashes = (structs: ScrappedStruct[]): string => {
  extractTypehashes(structs);
  let resultString = SOLIDITY_HEADER;
  for (const struct of structs) {
    const structName = struct.name;
    let fieldString = '';
    for (let i = 0; i < struct.fields.length; ++i) {
      const field = struct.fields[i];
      if (field.dataType.type == 'ElementaryTypeName') {
        fieldString += `${field.dataType.name} ${field.name}`;
      } else if (field.dataType.type == 'ArrayTypeName') {
        fieldString += `${field.dataType.baseTypeName?.name} ${field.name}`;
      }
      if (i < struct.fields.length - 1) {
        fieldString += `,`;
      }
    }
    resultString += `\nbytes32 constant ${struct.typehash} = keccak256("${structName}(${fieldString})");`;
  }
  return resultString;
};
