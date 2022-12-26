import { ScrappedStruct } from '../types';

export const generateTypes = (structs: ScrappedStruct[]): string => {
  let resultString = `import { TypedDataField } from '@ethersproject/abstract-signer';`;
  resultString += domain;
  for (const struct of structs) {
    resultString += generateSingleType(struct);
  }
  return resultString;
};

const generateSingleType = (struct: ScrappedStruct): string => {
  let variablesString = '';
  for (const field of struct.fields) {
    const dataType = field.dataType;
    if (dataType.type == 'ElementaryTypeName') {
      variablesString += `\n  { name: '${field.name}', type: '${dataType.name}' },`;
    } else if (dataType.type == 'ArrayTypeName') {
      variablesString += `\n  { name: '${field.name}', type: '${dataType.baseTypeName?.name}' },`;
    } else if (dataType.type == 'UserDefinedTypeName') {
      variablesString += `\n  { name: '${field.name}', type: '${dataType.namePath}' },`;
    }
  }
  const resultString = `export const ${struct.name}Type: Array<TypedDataField> = [${variablesString}\n];\n`;
  return resultString;
};

const domain = `
export const EIP712DomainType: Array<TypedDataField> = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
];\n`;
