//SPDX-License-Identifier: Unlicense

pragma solidity 0.8.17;

struct AtomicStructure {
    bytes32 bits;
    uint256 unsignedInt;
    int256 signedInt;
    bool boolean;
    address addr;
}

struct DynamicStructure {
    bytes bits;
    string str;
} 

struct ReferenceStructure {
    uint256[] arr;
    DynamicStructure recur;
}
