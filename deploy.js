// Setup the environment variables to load from .env file
require('dotenv').config();

// Start of this script
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const MNEMONIC = process.env.METAMASK_ACCOUNT_MNEMONIC;
const PROVIDER_OR_URL = process.env.ETHEREUM_NETWORK_URL;

const provider = new HDWalletProvider(MNEMONIC, PROVIDER_OR_URL);

const web3 = new Web3(provider);
