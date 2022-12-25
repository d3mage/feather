import { ScrappedStruct } from '../types';
import { SOLIDITY_HEADER } from './shared';

export const generateEIP712Base = (structs: ScrappedStruct[]): string => {
  let resultString = SOLIDITY_HEADER;
  resultString += `
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "./Typehashes.sol";
import "./Structs.sol";
  
contract EIP712Base is EIP712 {
  constructor(string memory name, string memory version) EIP712 (name, version) {}`;
  for (const struct of structs) {
    resultString += generateSingleFunction(struct);
  }
  resultString += `
}`;
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
    fieldString += `\n\t\t\t\t`;
    if (dataType.type == 'ElementaryTypeName') {
      if (dataType.name == 'string') {
        fieldString += `keccak256(bytes(params.${field.name}))`;
      } else {
        fieldString += `params.${field.name}`;
      }
    } else if (dataType.type == 'ArrayTypeName') {
      fieldString += `abi.encodePacked(params.${field.name})`;
    }
    if (i < struct.fields.length - 1) {
      fieldString += `,`;
    }
    console.log(field);
  }
  const resultString = `
  function recover${structName}(${structName} calldata params, bytes memory signature) external view returns (address) {
    bytes32 structHash = keccak256(
      abi.encode(
        ${struct.typehash},${fieldString}
      )
    );
    bytes32 typedHash = _hashTypedDataV4(structHash);
    return ECDSA.recover(typedHash, signature);
  }`;

  return resultString;
};
