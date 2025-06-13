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

        console.log(`.__. Interacting with contract at: ${deploymentInfo.contractAddress}`);


        // Get accounts 
        const accounts = await

        //Create contract instance 

        // Read initial value 

        //Set a new value 

        //Read the updatd value 

        // Test the increment function 

        // Read the final value 

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