import { ScrappedStruct } from '../types';
import { SOLIDITY_HEADER } from './shared';

export const generateHashingFunctions = (structs: ScrappedStruct[]): string => {
  let resultString = SOLIDITY_HEADER;
  resultString += `
  import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
  import "./Typehashes.sol";
  import "./Structs.sol";
  
  library RecoverSigner {`;
  for (const struct of structs) {
    resultString += generateSingleFunction(struct);
  }
  resultString += `}`;
  return resultString;
};

const generateSingleFunction = (struct: ScrappedStruct): string => {
  const structName = struct.structName;
  console.log(struct);
  let fieldString = '';
  for (let i = 0; i < struct.fields.length; ++i) {
    const field = struct.fields[i];
    const dataType = field.dataType;
    //todo: check all elementary types
    if (dataType.type == 'ElementaryTypeName') {
      if (dataType.name == 'string') {
        fieldString += `\nkeccak256(bytes(params.${field.name}))`;
      } else {
        fieldString += `\nparams.${field.name}`;
      }
    } else if (dataType.type == 'ArrayTypeName') {
      fieldString += `\nabi.encodePacked(params.${field.name})`;
    }
    if (i < struct.fields.length - 1) {
      fieldString += `,`;
    }
    console.log(field);
  }
  const resultString = `
  function recover${structName}(${structName} params) external view returns (address) {
    bytes32 structHash = keccak256(
      abi.encode(
        ${struct.typehash},${fieldString}
      )
    );
  }`;

  return resultString;
};
