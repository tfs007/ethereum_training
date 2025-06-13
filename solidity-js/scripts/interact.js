const fs = require('fs-extra');
const path = require('path');
const { Web3 } = require('web3');

async function interact() {
    try {;
        console.log('>>> Starting interaction...');

        // Connect to local ganache network 
        const web3 = new Web3('http://localhost:8545');

        // Load deployment info 

        const deploymentPath = path.resolve(__dirname,'..','build','deployment.json');
        const deploymentInfo = await fs.readJSON(deploymentPath);

        // console.log(`.__. Interacting with contract at: ${deploymentInfo.contractAddress}`);


        // Get accounts 
        const accounts = await web3.eth.getAccounts();
        const userAccount = accounts[0];

        // console.log("User account: ", userAccount);

        //Create contract instance 
        const contract = new web3.eth.Contract(
            deploymentInfo.abi, 
            deploymentInfo.contractAddress
        );

        // console.log(contract)

        // Read initial value 

        console.log('\n Reading initial stored value...');

        let storedValue = await contract.methods.get().call();
        console.log('Current stored value:', storedValue);

        //Set a new value 
        const newValue = 42;
        console.log('Setting new value: ', newValue);

        const setTx = await contract.methods.set(newValue).send({
            from: userAccount,
            gas: 100000
        });

        console.log('[√] Value set successfully');
        console.log(`Transaction hash: ${setTx.transactionHash}`);

        //Read the updatd value 
        console.log('Reading updated stored value...');
        storedValue = await contract.methods.get().call();
        console.log(`Current stored value: ${storedValue}`);

        // Test the increment function 
        console.log('\n Incrementing value...');
        const incrementTx = await contract.methods.increment().send({
            from: userAccount,
            gas: 100000
        });
        console.log('Value incremented');
        console.log('Transaction hash: ', incrementTx.transactionHash);

        // Read the final value 
        storedValue = await contract.methods.get().call();
        console.log(`>>>Current stored value: ${storedValue}`);

        // Listen for events (demo event handling)

        // Trigger one more change to demo event 

        // Wait a moment for the event to be processed 

        
        
    } catch (error) {
        
    }
    
}

// Run compliation if this script is executred directly 
if(require.main == module) {
    interact();
}

module.exports = interact;