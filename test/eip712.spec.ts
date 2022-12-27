import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

import * as dataTypes from './types';

describe('EIP712 Tests', () => {
  const CONTRACT_NAME = 'EIP712 Contract';
  const VERSION = '1';

  const deployFixture = async () => {
    const [owner] = await ethers.getSigners();
    const EIP712Base = await ethers.getContractFactory('EIP712Base');
    const instance = await EIP712Base.deploy(CONTRACT_NAME, VERSION);
    const chainId = await owner.getChainId();
    const verifyingContract = instance.address;
    const domain = {
      name: CONTRACT_NAME,
      version: VERSION,
      chainId,
      verifyingContract,
    };
    return { instance, owner, domain };
  };

  it('successfully tests AtomicStructure', async () => {
    const { instance, owner, domain } = await loadFixture(deployFixture);
    const params = {
      bits: '0xfa5c128a3FbdB3F0bFFf389EBA25e81DB27DC8FCCb29e4B35eBa4dD4CD3c49F6',
      unsignedInt: 3872,
      signedInt: 9126,
      boolean: true,
      addr: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    };

    const types = {
      AtomicStructure: dataTypes.AtomicStructureType,
    };
    const signature = owner._signTypedData(domain, types, params);
    const recoveredAddress = await instance.callStatic.recoverAtomicStructure(
      params,
      signature,
    );
    expect(owner.address).to.be.eql(recoveredAddress);
  });
  it('successfully tests DynamicStructure', async () => {
    const { instance, owner, domain } = await loadFixture(deployFixture);
    const params = {
      bits: '0xdc010DC17b9AAD8daf0dc4C433C290cacbd48a4cAa2Ef6693EBbE24EeF21f91E9C8C0d5A6f07eDCa3bCC68dB9687CCaa20909A0866EfA0d909EeC38f',
      str: 'Cristian',
    };

    const types = {
      DynamicStructure: dataTypes.DynamicStructureType,
    };
    const signature = owner._signTypedData(domain, types, params);
    const recoveredAddress = await instance.callStatic.recoverDynamicStructure(
      params,
      signature,
    );
    expect(owner.address).to.be.eql(recoveredAddress);
  });
  it('successfully tests ReferenceStructure', async () => {
    const { instance, owner, domain } = await loadFixture(deployFixture);
    const params = {
      arr: [1368, 432, 3009, 4840, 6744],
      recur: {
        bits: '0xC8B02D2DAc33d1C1BFbe36dab8247446324d55Accdc1CAa84009fEF6ec4439D2a671e123ACABD1dee1Ad48EbedD91a5D961aAaFa8797A9eb791c3EFC',
        str: 'Maya',
      },
    };

    const types = {
      ReferenceStructure: dataTypes.ReferenceStructureType,
      DynamicStructure: dataTypes.DynamicStructureType,
    };
    const signature = owner._signTypedData(domain, types, params);
    const recoveredAddress =
      await instance.callStatic.recoverReferenceStructure(params, signature);
    expect(owner.address).to.be.eql(recoveredAddress);
  });
});
