const fs = require('fs-extra');
const path = require('path');
const { Web3 } = require('web3');

async function deploy() {
    try {
        console.log('[=>] Starting deployment...');

        // Connect to network (local Ganache network)
        const web3 = new Web3('http://localhost:8545');

        //Check the Connection 
        const isConnected = await web3.eth.net.isListening();
        if (!isConnected) {
            throw new Error('Cannot connect to Ethereum Network...Make sure Ganaceh is running on localhost:7545')
        }

        console.log('[#] Connected to Ethereum Network!')

        // Get accounts
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
            throw new Error('+_+ No accounts available!')
        }

        const deployerAccount = accounts[0];
        console.log(`[D] Deploying from account: ${deployerAccount}`);
        //Get account balance 
        const balance = await web3.eth.getBalance(deployerAccount);
        console.log(`💰Account Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);

        // Load compiled contract 
        const buildPath = path.resolve(__dirname,'..','build','SimpleStorage.json');
        const contractData = await fs.readJson(buildPath);
        // console.log(contractData);
        // Create contract instance 
        const contract = new web3.eth.Contract(contractData.abi);
        // console.log(contract);

        // Estimate gas deployment 
        const deployTx = contract.deploy({
            data: '0x'+contractData.bytecode
        });
        // console.log(deployTx);
        const gasEstimate =await deployTx.estimateGas({ from: deployerAccount});
        console.log(`[G] Estimated gas: ${gasEstimate}`);
        //Deploy the Contract 
        console.log('[==>] Deploying contract...');
        const gasLimit = BigInt(gasEstimate) + BigInt(100000);
        const deployedContract = await deployTx.send({
            from: deployerAccount,
            gas: gasLimit.toString(), // convert to string from web3
            gasPrice: await web3.eth.getGasPrice()
        });
        console.log('>>> Contract deployed successfully! ');
        console.log(`[A] Contract Address: ${deployedContract.options.address}`);
        console.log(`[T] Transaction hash: ${deployedContract.transactionHash}`);
        // Save the deployment info 
        const deploymentInfo = {
            contractAddress: deployedContract.options.address,
            transactionHash: deployedContract.transactionHash,
            deployerAccount: deployerAccount,
            deploymentTime: new Date().toISOString(),
            abi: contractData.abi
        };

        const deploymentPath = path.resolve(__dirname, '..','build','deployment.json');
        await fs.writeJson(deploymentPath, deploymentInfo, { spaces: 2});

        console.log(`[@] Deployment info saved to: ${deploymentPath}`);
        return deploymentInfo;

    } catch (error) {
        console.error('[X] Deployment failed: ', error.message);
        process.exit(1);
    }
}

// Run compliation if this script is executred directly 
if(require.main == module) {
    deploy();
}

module.exports = deploy;