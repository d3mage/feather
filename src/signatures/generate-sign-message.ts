import { ScrappedStruct } from '../types';
import { CONTRACT_NAME, CONTRACT_VERSION } from './shared';

export const generateSignMessage = (structs: ScrappedStruct[]): string => {
  let dataString = `import * as Types from './types';
`;
  for (const struct of structs) {
    dataString += generateSingleSignMessage(struct);
  }

  const resultString = `${dataString}`;

  return resultString;
};

export const generateSingleSignMessage = (struct: ScrappedStruct): string => {
  const structName = struct.structName;
  const resultString = `export const create${structName}Signature = (chainId: number, verifyingContract: string) => {
  
    const domain = {
      name: "${CONTRACT_NAME}",
      version: "${CONTRACT_VERSION}",
      chainId,
      verifyingContract
    };

    const types = {
      ${structName}: Types.${structName}Type
    };

    const primaryType = "${struct.structName}"
    return { domain, types, primaryType }
};
`;
  return resultString;
};
