import { Struct } from '../types';

export const generateTypes = (structs: Struct[]): string => {
  let resultString = `import { TypedDataField } from '@ethersproject/abstract-signer';`;
  resultString += domain;
  for (const struct of structs) {
    resultString += structToString(struct);
  }
  return resultString;
};

const structToString = (struct: Struct): string => {
  let variablesString = '';
  for (const member of struct.members) {
    console.log(member);
    if (member.typeName.type == 'ElementaryTypeName') {
      variablesString += `
        { name: '${member.name}', type: '${member.typeName.name}' },`;
    } else if (member.typeName.type == 'ArrayTypeName') {
      variablesString += `
        { name: '${member.name}', type: '${member.typeName.baseTypeName?.name}' },`;
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
