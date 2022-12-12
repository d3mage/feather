import { TypedDataField } from '@ethersproject/abstract-signer';
export const EIP712DomainType: Array<TypedDataField> = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
];
export const SimpleStructureType: Array<TypedDataField> = [
        { name: 'to', type: 'address' },
        { name: 'amount', type: 'uint256' },
];
export const AdvancedStructureType: Array<TypedDataField> = [
        { name: 'message', type: 'string' },
        { name: 'values', type: 'uint256' },
];
