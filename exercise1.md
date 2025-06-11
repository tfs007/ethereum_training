**Exercise** : Extend and Interact with the HelloEthereum Contract

**Objective** 
You will customize and extend a basic Solidity smart contract to:
- Store a personalized greeting
- Track who last changed the greeting
- Learn how public variables and functions behave on the blockchain
-------
*Base Contract Code* 

Use this as your starting point (already provided in Remix):
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloEthereum {
    string public greeting = "Hello, Ethereum!";

    function getGreeting() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _newGreeting) public {
        greeting = _newGreeting;
    }
}
```
--------

**Your Tasks:** 
1. Add a lastUpdatedBy variable
   - Type: address
   - Purpose: Store the address of the user who last updated the greeting


2. Update the setGreeting function
   - After updating the greeting, also update lastUpdatedBy with msg.sender


3. Add a function called getLastUpdater
   - Returns the lastUpdatedBy address


4. Deploy and Test the updated contract in Remix

   - Use Remix VM (Prague)
   - Call setGreeting("Your new greeting")
   - Verify that greeting() returns the new message
   - Call getLastUpdater() to verify the address matches the current account

