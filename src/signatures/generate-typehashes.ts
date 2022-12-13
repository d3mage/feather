import { ScrappedStruct } from '../types';
import { SOLIDITY_HEADER } from './shared';

export const extractTypehashes = (structs: ScrappedStruct[]): string => {
  return ''; //todo: extract typehashes in a separate function which writes typehash to the struct
}

//todo: refactor it to use {extractTypehashes} method
export const generateTypehashes = (structs: ScrappedStruct[]): string => { 
  let resultString = SOLIDITY_HEADER;
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
    const typehash = `${structName.toUpperCase()}_TYPEHASH`;
    resultString +=`\nbytes32 constant ${typehash} = keccak256("${structName}(${fieldString}");`;
    struct.typehash = typehash;
  }
  return resultString;
};
