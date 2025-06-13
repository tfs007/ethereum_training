// File : SimpleStorage.sol 
// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedData; 

    event ValueChanged(uint256 newValue, address changedBy);

    function set(uint256 value) public {
        storedData = value;
        emit ValueChanged(value, msg.sender);
    }

    function get() public view returns (uint256) {
        return storedData; 
    }

    function increment() public {
        storedData += 1;
        emit ValueChanged(storedData, msg.sender);
    }
}
