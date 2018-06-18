const HDWalletProvider = require('truffle-hdwallet-provider'); // load Truffle Provider for Rinkeby
const Web3 = require('web3');
const compiledFactory = require('./build/AssetFactory.json')
// Setting up the provider in which we will be able to deploy our contract
const provider = new HDWalletProvider(
  'entire slush disease art roast maximum away two awful coyote visit cute', // Account Mneumonic
  'https://rinkeby.infura.io/koT3m8dvSuLb9SmYI5Tf' // INFURA Link
);

// Setting up the instance of web3 with which we'll be able to communicate with our contract
const web3 = new Web3(provider);

const deploy = async () => { // The only purpose of creating and calling this function is to be able to async - await for asynchronous requests.
  const accounts = await web3.eth.getAccounts(); // requesting the first account from our INFURA link
  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  ) // Parse in the interface ABI from JSON to JS
    .deploy({ data: compiledFactory.bytecode }) // Bytecode and initial message which we want to put into our contract.
    .send({ gas: '3000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);

};
deploy();
