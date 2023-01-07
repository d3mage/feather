import { ScrappedStruct } from '../types';
import { SOLIDITY_HEADER } from './shared';

export const extractTypehashNames = (structs: ScrappedStruct[]) => {
  for (const struct of structs) {
    struct.typehash = `${struct.name.toUpperCase()}_TYPEHASH`;
  }
};

export const extractFields = (
  struct: ScrappedStruct,
  structs: ScrappedStruct[],
): string => {
  let resultString = `${struct.name}(`;
  let endString = ``;
  const length = struct.fields.length;
  for (let i = 0; i < length; ++i) {
    const field = struct.fields[i];
    const dataType = field.dataType;
    if (dataType.type == 'ElementaryTypeName') {
      resultString += `${dataType.name} ${field.name}`;
    } else if (dataType.type == 'ArrayTypeName') {
      resultString += `${dataType.baseTypeName?.name}[] ${field.name}`;
    } else if (dataType.type == 'UserDefinedTypeName') {
      const innerStructName = dataType.namePath;
      const innerStruct = structs.find((x) => x.name == innerStructName);
      if (innerStruct == undefined) {
        throw Error(`${innerStructName} is not found.`);
      }
      resultString += `${innerStructName} ${field.name}`;
      endString += extractFields(innerStruct, structs);
    }
    if (i < length - 1) {
      resultString += `,`;
    }
  }
  resultString += `)`;
  resultString += endString;
  return resultString;
};

export const generateTypehashes = (structs: ScrappedStruct[]): string => {
  extractTypehashNames(structs);
  let resultString = SOLIDITY_HEADER;
  for (const struct of structs) {
    const fieldString = extractFields(struct, structs);
    resultString += `\nbytes32 constant ${struct.typehash} = keccak256("${fieldString}");`;
  }
  return resultString;
};
