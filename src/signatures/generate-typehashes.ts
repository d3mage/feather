import { ScrappedStruct } from '../types';
import { SOLIDITY_HEADER } from './common';

export const generateTypehashes = (structs: ScrappedStruct[]): string => {
  let resultString = SOLIDITY_HEADER;
  resultString += `\nlibrary Typehashes {`
  for (const struct of structs) {
    const structName = struct.structName;
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
    resultString +=`
    bytes32 constant ${structName.toUpperCase()}_TYPEHASH = ` +
      `keccak256("${structName}(${fieldString}");`;
  }
  resultString += `\n}`
  return resultString;
};
