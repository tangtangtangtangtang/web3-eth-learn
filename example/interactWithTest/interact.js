const { Web3 } = require('web3')
const path = require('path')
const fs = require('fs')
const abi = require('./abi.json')

const provider = new Web3('https://rpc-amoy.polygon.technology');
// Read the contract address from the file system
const deployedAddressPath = path.join(__dirname, "MyContractAddress.txt");
const deployedAddress = fs.readFileSync(deployedAddressPath, "utf8");

async function getNumber() {
    try {
        //initialize contract
        const myContract = new provider.eth.Contract(abi, deployedAddress);
        myContract.handleRevert = true;

        //make call
        const result = await myContract.methods.getNumber().call();
    
        console.log('result: ', result)

        const events = await myContract.getPastEvents()
        console.log("🚀 ~ increase ~ events:", JSON.stringify(events))
    } catch (error) {
        console.log("🚀 ~ getNumber ~ error:", error)
    }
}

getNumber()

async function increase() {
    //initialize a wallet(with funds)
    const wallet = provider.eth.wallet.add('0x98622d094ada18e5a01bc51ad915bde4aecf3efbf6aa872dd55ae83744e7f7f1');
  
    const gas = await provider.eth.estimateGas()
    console.log("🚀 ~ increase ~ gas:", gas)
    //initialize contract
    const myContract = new provider.eth.Contract(abi, deployedAddress);

    const txReceipt = await myContract.methods
      .increase() //name of the function you are calling in the contract
      .send({ 
        from: wallet[0].address,
        gasPrice: 30 * 1000000000
    });
  
    //show tx hash
    console.log(txReceipt.transactionHash);
}

// increase()