import { ScrappedStruct } from '../types';
import {
  generateAddressData,
  generateArrayUintData,
  generateStringData,
  generateUintData,
} from '../utils';
import { CONTRACT_NAME, CONTRACT_VERSION } from './shared';

export const generateTest = (structs: ScrappedStruct[]): string => {
  let successfulTestString = '';
  let faultyTestString = '';
  for (const struct of structs) {
    successfulTestString += generateSuccessfulTest(struct);
    faultyTestString += generateFaultyTest(struct);
  }
  const resultString = `
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

import * as lib from './sign-message';
    
describe('EIP712 Tests', () => {
    const CONTRACT_NAME = "${CONTRACT_NAME}";
    const VERSION = "${CONTRACT_VERSION}"; 

    const deployFixture = async () => {
        const [owner, attacker] = await ethers.getSigners();
        const EIP712Base = await ethers.getContractFactory("EIP712Base");
        const instance = await EIP712Base.deploy(CONTRACT_NAME, VERSION); 
        const chainId = await owner.getChainId();
        const verifyingContract = instance.address;
        return { instance, owner, attacker, chainId, verifyingContract }
    }
    ${successfulTestString}

});`;

  return resultString;
};

const generateSuccessfulTest = (struct: ScrappedStruct): string => {
  const structName = struct.structName;
  let resultString = `
    it('successfully tests ${structName}', async () => {
        const { instance, owner, chainId, verifyingContract } = await loadFixture(deployFixture);
        ${generateParamsData(struct)}
        const { domain, types, primaryType } = lib.create${structName}Signature(chainId, verifyingContract);
        const signature = owner._signTypedData(domain, types, params);
        const recoveredAddress = await instance.callStatic.recover${structName}(params, signature);
        expect(owner.address).to.be.eql(recoveredAddress);
    });`;
  return resultString;
};

const generateFaultyTest = (struct: ScrappedStruct): string => {
  const structName = struct.structName;
  let resultString = `
    it('${struct.structName} fails', async () => {
        const { chainId } = await loadFixture(deployFixture);
        ${generateParamsData(struct)}
        const signature = await lib.create${structName}Signature(params, chainId);
    });`;
  return resultString;
};

const generateParamsData = (struct: ScrappedStruct): string => {
  let dataString = '';
  for (const field of struct.fields) {
    dataString += `\n\t\t${field.name}:`;
    if (field.dataType.type == 'ElementaryTypeName') {
      if (field.dataType.name == 'address') {
        dataString += `"${generateAddressData()}"`;
      } else if (field.dataType.name == 'string') {
        dataString += `"${generateStringData()}"`;
      } else if (field.dataType.name == 'uint256') {
        dataString += `${generateUintData()}`;
      }
    } else if (field.dataType.type == 'ArrayTypeName') {
      dataString += `[${generateArrayUintData()}]`;
    }
    dataString += `,`;
  }
  const resultString = `const params = {${dataString}
    };`;
  return resultString;
};
