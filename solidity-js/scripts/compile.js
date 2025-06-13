const fs = require('fs-extra')
const path = require('path')
const solc = require('solc')

async function compile() {
    try {
        console.log('Compiling SimpleStorage contract...');

        // Read the contract source code 
        const contractPath = path.resolve(__dirname, '..','contracts','SimpleStorage.sol');
        const contractSource = await fs.readFile(contractPath,'utf8');

        // Prepare the input for the Solidity compiler 

        //Compile the contract 

        //Check for compilation errors 

        // Extract the compiled contract 

        //Create build directory if it doesn't exist 

        // Save the compiled contract 

        // Publish some helpful messages 

        // return abi and bytecode 

    } catch (error) {
        console.error('[X] Compilation failed', error.message);
        process.exit(1);
    }
}

// Run compliation if this script is executred directly 
if(require.main == module) {
    compile();
}

module.exports = compile; 