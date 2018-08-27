const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider)
// const web3 = new Web3(ganache.provider())
const {interface, bytecode} = require('../compile')

let fetchedAccount;
let inbox;
beforeEach(async () => {
	fetchedAccount = await web3.eth.getAccounts()
	
	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({data: bytecode, arguments: ['Hi there!']})
		.send({ from: fetchedAccount[0], gas: '1000000'})
	inbox.setProvider(provider);
})

describe("Inbox", () => {
	it("deploys a contract", () => {
		assert.ok(inbox.options.address)
	});
	 it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

	 it('can change the message', async () => {
    await inbox.methods.setMessage('bye')
    	.send({from: fetchedAccount[0], gas:'1000000'});
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
	 })
})

// class Car {

// 	park() {
// 		return "Stopped"
// 	}

// 	drive() {
// 		return "vroom"
// 	} 
// }

// let car;

// beforeEach(() => {
// 	// console.log("A")
// 	car = new Car();
// })

// describe("Car", () => {
// 	it("can park", () => {
// 		assert.equal(car.park(), 'Stopped')
// 	})
// 	it("can drive", () => {
// 		assert.equal(car.drive(), 'vroom')
// 	})
// })