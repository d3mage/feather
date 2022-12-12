import { ScrappedStruct } from '../types';

export const generateTypes = (structs: ScrappedStruct[]): string => {
  let resultString = `import { TypedDataField } from '@ethersproject/abstract-signer';`;
  resultString += domain;
  for (const struct of structs) {
    resultString += structToString(struct);
  }
  return resultString;
};

const structToString = (struct: ScrappedStruct): string => {
  let variablesString = '';
  for (const field of struct.fields) {
    if (field.dataType.type == 'ElementaryTypeName') {
      variablesString += `\n  { name: '${field.name}', type: '${field.dataType.name}' },`;
    } else if (field.dataType.type == 'ArrayTypeName') {
      variablesString += `\n  { name: '${field.name}', type: '${field.dataType.baseTypeName?.name}' },`;
    }
  }
  const resultString = `export const ${struct.structName}Type: Array<TypedDataField> = [${variablesString}\n];\n`;
  return resultString;
};

const domain = `
export const EIP712DomainType: Array<TypedDataField> = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
];\n`;
