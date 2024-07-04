const { Web3 } = require("web3");
const path = require("path");
const fs = require("fs");

const web3 = new Web3("https://rpc-amoy.polygon.technology");

const bytecodePath = path.join(__dirname, "MyContractBytecode.bin");
const bytecode = fs.readFileSync(bytecodePath, "utf8");

const abi = require("./MyContractAbi.json");
const myContract = new web3.eth.Contract(abi);
myContract.handleRevert = true;

async function deploy() {
  web3.eth.accounts.wallet.add('0x98622d094ada18e5a01bc51ad915bde4aecf3efbf6aa872dd55ae83744e7f7f1')
  const providersAccounts = await web3.eth.getAccounts();
  const defaultAccount = providersAccounts[0];
  console.log("Deployer account:", defaultAccount);

  const contractDeployer = await myContract.deploy({
    data: "0x" + bytecode,
    arguments: [1],
  });

//   const gas = await contractDeployer.estimateGas()
//   console.log("🚀 ~ deploy ~ gas:", gas)
//   console.log(myContract.options)

  const gas = await contractDeployer.estimateGas({
    from: defaultAccount,
  });
  console.log("Estimated gas:", gas);

  try {
    const tx = await contractDeployer.send({
      from: '0x3DC1c179f8c2EDBbfab3FE5d29660E661DABC1BD',
      gas,
      gasPrice: 30 * 1000000000,
    });
    console.log("Contract deployed at address: " + tx.options.address);

    const deployedAddressPath = path.join(__dirname, "MyContractAddress.txt");
    fs.writeFileSync(deployedAddressPath, tx.options.address);
  } catch (error) {
    console.error(error);
  }
}

deploy();