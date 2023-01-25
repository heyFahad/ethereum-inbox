// Setup the environment variables to load from .env file
require('dotenv').config();

// Start of this script
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const MNEMONIC = process.env.METAMASK_ACCOUNT_MNEMONIC;
const PROVIDER_OR_URL = process.env.ETHEREUM_NETWORK_URL;

const provider = new HDWalletProvider(MNEMONIC, PROVIDER_OR_URL);
const web3 = new Web3(provider);

// Create an IIFE to use the web3 library using async/await
(async () => {
    const accounts = await web3.eth.getAccounts();
    const fromAccount = accounts[0];
    console.log('Attempting to deploy from account', fromAccount);

    // Deploy the contract on a real-world blockchain network
    const result = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object,
            arguments: ['Hi there!'],
        })
        .send({
            from: fromAccount,
            gas: '1000000',
        });
    console.log(`Contract deployed to ${result.options.address}`);

    // To prevent a hanging deployment, stop the provider engine
    provider.engine.stop();
})();
