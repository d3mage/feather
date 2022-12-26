import { TypedDataField } from '@ethersproject/abstract-signer';
export const EIP712DomainType: Array<TypedDataField> = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
];
export const AtomicStructureType: Array<TypedDataField> = [
  { name: 'bits', type: 'bytes32' },
  { name: 'unsignedInt', type: 'uint256' },
  { name: 'signedInt', type: 'int256' },
  { name: 'boolean', type: 'bool' },
  { name: 'addr', type: 'address' },
];
export const DynamicStructureType: Array<TypedDataField> = [
  { name: 'bits', type: 'bytes' },
  { name: 'str', type: 'string' },
];
export const ReferenceStructureType: Array<TypedDataField> = [
  { name: 'arr', type: 'uint256' },
  { name: 'recur', type: 'DynamicStructure' },
];
