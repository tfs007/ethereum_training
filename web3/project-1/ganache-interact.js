import Web3 from 'web3';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const utils = require('web3-utils');

const web3 = new Web3('http://127.0.0.1:7545')

async function main() {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('Accounts:', accounts);

        const balanceWei = await web3.eth.getBalance(accounts[8]);
        console.log("Balance in Wei:", balanceWei);

        const balanceEth = (BigInt(balanceWei)/ 10n ** 18n).toString();
        console.log("Balance in Eth: ", balanceEth);
    } catch (error) {
        console.error('Error:', error)
    }
}

main();