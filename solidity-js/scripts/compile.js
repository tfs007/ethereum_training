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

        const input = {
            language: 'Solidity',
            sources: {
                'SimpleStorage.sol':{
                    content: contractSource
                }
            },
            settings: {
                outputSelection: {
                    '*': {
                        '*': ['abi','evm.bytecode']
                    }
                }
            }

        };

        //Compile the contract 
        const compiledContract = JSON.parse(solc.compile(JSON.stringify(input)));

        // console.log(compiledContract);

        //Check for compilation errors 
        if (compiledContract.errors) {
            compiledContract.errors.forEach(error => {

                if(error.severity === 'error') {
                    console.error('[X] Compilation Error: ', error.formattedMessage);
                    process.exit(1);
                } else {
                    console.warn("[!!] Warning: ", error.formattedMessage);
                }
            });
        }

        // Extract the compiled contract 
        const contract = compiledContract.contracts['SimpleStorage.sol']['SimpleStorage'];
        // console.log(contract);

        //Create build directory if it doesn't exist 
        const buildPath = path.resolve(__dirname,'..','build');
        await fs.ensureDir(buildPath);

        // Save the compiled contract 
        const outputPath = path.resolve(buildPath,'SimpleStorage.json');
        await fs.writeJSON(outputPath, {
            abi: contract.abi,
            bytecode: contract.evm.bytecode.object
        }, {spaces : 2});

        // Publish some helpful messages 

        console.log('[√] Contract compiled successfully!');
        console.log(`Output saved to : ${outputPath}`);

        // return abi and bytecode 
        return {
            abi: contract.abi,
            bytecode: contract.evm.bytecode.object
        };

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