import { ScrappedStruct } from '../types';
import { SOLIDITY_HEADER } from './common';

export const generateHashingFunctions = (structs: ScrappedStruct[]): string => {
  let resultString = SOLIDITY_HEADER;
  resultString += `
  import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
  import "./Typehashes.sol";
  import "./Structs.sol";
  
  library RecoverSigner {`;
  for (const struct of structs) {
    const structName = struct.structName; 
  }
  resultString += `}`;
  return resultString;
};


