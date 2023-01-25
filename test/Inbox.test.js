const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { abi, evm } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts = undefined;
let inbox = undefined;
const INITIAL_MESSAGE_STRING = 'Hi there!';
const UPDATED_MESSAGE_STRING = 'Bye!';

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object,
            arguments: [INITIAL_MESSAGE_STRING],
        })
        .send({
            from: accounts[0],
            gas: '1000000',
        });
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, INITIAL_MESSAGE_STRING);
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage(UPDATED_MESSAGE_STRING).send({
            from: accounts[0],
            gas: '1000000',
        });

        const message = await inbox.methods.message().call();
        assert.strictEqual(message, UPDATED_MESSAGE_STRING);
    });
});
