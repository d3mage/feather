//SPDX-License-Identifier: Unlicense

pragma solidity 0.8.17;

//todo: introduce more atomic types
struct SimpleStructure {
    address to;
    uint256 amount;
}

//todo: introduce more dynamic types
struct AdvancedStructure {
    string message;
    uint256[] values;
}

//todo: introduce struct in a struct