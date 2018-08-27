
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
'earth myth dash clip sentence december marine credit cheap city bar extend',
'https://rinkeby.infura.io/v3/c47ab6e1c8a64b70abeb7732dbc47286'
);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log("Accounts", accounts[0]);

	const result = await new web3.eth.Contract(JSON.parse(interface))
													.deploy({ data: bytecode, arguments: ['Hi there!'] })
													.send({ gas: "1000000", from: accounts[0]});

	console.log("Contract deployed to", result.options.address);
}
deploy();
