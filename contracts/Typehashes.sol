//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17; 
bytes32 constant ATOMICSTRUCTURE_TYPEHASH = keccak256("AtomicStructure(bytes32 bits,uint256 unsignedInt,int256 signedInt,bool boolean,address addr)");
bytes32 constant DYNAMICSTRUCTURE_TYPEHASH = keccak256("DynamicStructure(bytes bits,string str)");
bytes32 constant REFERENCESTRUCTURE_TYPEHASH = keccak256("ReferenceStructure(uint256 arr,DynamicStructure recur)DynamicStructure(bytes bits,string str)");