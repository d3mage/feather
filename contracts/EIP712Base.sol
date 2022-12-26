//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17; 
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "./Typehashes.sol";
import "./Structs.sol";
  
contract EIP712Base is EIP712 {
  constructor(string memory name, string memory version) EIP712 (name, version) {}
function hashAtomicStructure(AtomicStructure calldata params) internal pure returns (bytes32) {
    return keccak256(
      abi.encode(
        ATOMICSTRUCTURE_TYPEHASH,
				params.bits,
				params.unsignedInt,
				params.signedInt,
				params.boolean,
				params.addr
      )
    );
  }
  function recoverAtomicStructure(AtomicStructure calldata params, bytes memory signature) external view returns (address) {
    bytes32 structHash = hashAtomicStructure(params);
    bytes32 typedHash = _hashTypedDataV4(structHash);
    return ECDSA.recover(typedHash, signature);
  }
function hashDynamicStructure(DynamicStructure calldata params) internal pure returns (bytes32) {
    return keccak256(
      abi.encode(
        DYNAMICSTRUCTURE_TYPEHASH,
				keccak256(params.bits),
				keccak256(bytes(params.str))
      )
    );
  }
  function recoverDynamicStructure(DynamicStructure calldata params, bytes memory signature) external view returns (address) {
    bytes32 structHash = hashDynamicStructure(params);
    bytes32 typedHash = _hashTypedDataV4(structHash);
    return ECDSA.recover(typedHash, signature);
  }
function hashReferenceStructure(ReferenceStructure calldata params) internal pure returns (bytes32) {
    return keccak256(
      abi.encode(
        REFERENCESTRUCTURE_TYPEHASH,
				abi.encodePacked(params.arr),
				hashDynamicStructure(params.recur)
      )
    );
  }
  function recoverReferenceStructure(ReferenceStructure calldata params, bytes memory signature) external view returns (address) {
    bytes32 structHash = hashReferenceStructure(params);
    bytes32 typedHash = _hashTypedDataV4(structHash);
    return ECDSA.recover(typedHash, signature);
  }
}