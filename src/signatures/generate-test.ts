import { ScrappedStruct } from '../types';
import {
  generateAddressData,
  generateBoolData,
  generateBytesData,
  generateHexData,
  generateStringData,
  generateUintData,
} from '../utils';
import { CONTRACT_NAME, CONTRACT_VERSION } from './shared';

export const generateTest = (structs: ScrappedStruct[]): string => {
  let successfulTestString = '';
  for (const struct of structs) {
    successfulTestString += generateSingleTest(struct, structs);
  }
  const resultString = `
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

import * as dataTypes from './types';
    
describe('EIP712 Tests', () => {
    const CONTRACT_NAME = "${CONTRACT_NAME}";
    const VERSION = "${CONTRACT_VERSION}"; 

    const deployFixture = async () => {
        const [owner] = await ethers.getSigners();
        const EIP712Base = await ethers.getContractFactory("EIP712Base");
        const instance = await EIP712Base.deploy(CONTRACT_NAME, VERSION); 
        const chainId = await owner.getChainId();
        const verifyingContract = instance.address;
        const domain = {
          name: CONTRACT_NAME,
          version: VERSION,
          chainId,
          verifyingContract
        };
        return { instance, owner, domain }
    }
    ${successfulTestString}

});`;

  return resultString;
};

const generateSingleTest = (
  struct: ScrappedStruct,
  structs: ScrappedStruct[],
): string => {
  const structName = struct.name;
  let resultString = `
    it('successfully tests ${structName}', async () => {
        const { instance, owner, domain } = await loadFixture(deployFixture);
        const params = {
          ${generateParamsData(struct, structs)}
        };
        ${generateTypes(struct)}
        const signature = owner._signTypedData(domain, types, params);
        const recoveredAddress = await instance.callStatic.recover${structName}(params, signature);
        expect(owner.address).to.be.eql(recoveredAddress);
    });`;
  return resultString;
};

const generateParamsData = (
  struct: ScrappedStruct,
  structs: ScrappedStruct[],
): string => {
  let resultString = '';
  for (const field of struct.fields) {
    resultString += `\n\t\t${field.name}:`;
    const dataType = field.dataType;
    if (dataType.type == 'ElementaryTypeName') {
      const dataTypeName = dataType.name;
      resultString += generateElementaryData(dataTypeName);
    } else if (dataType.type == 'ArrayTypeName') {
      let length =
        dataType.length?.number != undefined ? dataType.length.number : 5;
      let typeName = dataType.baseTypeName?.name.includes('int')
        ? 'hex'
        : dataType.baseTypeName?.name;
      let arrayString = '';

      for (let i = 0; i < length; ++i) {
        arrayString += generateElementaryData(typeName);
        arrayString += `,`;
      }
      resultString += `[${arrayString}]`;
    } else if (field.dataType.type == 'UserDefinedTypeName') {
      const innerStructName = dataType.namePath;
      const innerStruct = structs.find((x) => x.name == innerStructName);
      if (innerStruct == undefined) {
        throw Error(`${innerStructName} is not found.`);
      }
      resultString += `{
        ${generateParamsData(innerStruct, structs)}
       }`;
    }
    resultString += `,`;
  }
  return resultString;
};

const generateElementaryData = (dataTypeName: string | undefined): string => {
  if (dataTypeName == 'bytes') {
    return ` "${generateBytesData(60)}"`;
  } else if (dataTypeName?.includes('bytes')) {
    const bytesNumber = Number.parseInt(dataTypeName.slice(5));
    return ` "${generateBytesData(bytesNumber)}"`;
  } else if (dataTypeName?.includes('int')) {
    return `${generateUintData()}`;
  } else if (dataTypeName == 'bool') {
    return `${generateBoolData()}`;
  } else if (dataTypeName == 'address') {
    return `"${generateAddressData()}"`;
  } else if (dataTypeName == 'string') {
    return `"${generateStringData()}"`;
  } else if (dataTypeName == 'hex') {
    return `${generateHexData()}`;
  } else {
    throw Error(`Invalid datatype: ${dataTypeName}`);
  }
};

const generateTypes = (struct: ScrappedStruct): string => {
  let additionalTypes = '';
  for (const field of struct.fields) {
    if (field.dataType.type == 'UserDefinedTypeName') {
      additionalTypes += `\t${field.dataType.namePath}: dataTypes.${field.dataType.namePath}Type,`;
    }
  }
  const structName = struct.name;
  const resultString = `
  const types = {
      ${structName}: dataTypes.${structName}Type,
      ${additionalTypes}
    };`;
  return resultString;
  // `const primaryType = "${struct.name}"`
};
