const fs = require('fs');
const path = require('path');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
    language: 'Solidity', // REQUIRED. Currently supported values are only "Solidity" and "Yul".
    // `sources` key is also REQUIRED to specify the input source code files
    sources: {
        'Inbox.sol': {
            content: source, // `content` key is REQUIRED here unless the `urls` key is specified to point to the source files
        },
    },
    settings: {
        outputSelection: {
            // an asterisk as a file name matches all files
            '*': {
                // An asterisk as contract name refers to all contracts in the file.
                // The asterisk inside the array enables all types of output for the Contract level
                '*': ['*'],
            },
        },
    },
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Inbox.sol'].Inbox;
