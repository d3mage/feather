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
  for (const member of struct.fields) {
    if (member.dataType.type == 'ElementaryTypeName') {
      variablesString += `
        { name: '${member.name}', type: '${member.dataType.name}' },`;
    } else if (member.dataType.type == 'ArrayTypeName') {
      variablesString += `
        { name: '${member.name}', type: '${member.dataType.baseTypeName?.name}' },`;
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
