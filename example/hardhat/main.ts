import { Web3 } from 'web3';

// provider
const web3 = new Web3('https://eth.llamarpc.com');

// get block number
const utils = async () => { 
    web3.eth.getBlockNumber().then(console.log);
    await web3.eth.getChainId();
    await web3.eth.getBalance('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
    await web3.eth.getGasPrice();
}


// create radom wallet
const wallet = web3.eth.accounts.wallet.create(1)
export const account = web3.eth.accounts.wallet.add(wallet[0].privateKey);
console.log(account[0].address);
console.log(account[0].privateKey);

// create transaction object to send 1 eth to '0xa32...c94' address from the account[0]
const transfer = async () => {
    const txReceipt = await web3.eth.sendTransaction({ 
        from: account[0].address,
        to: '0xa3286628134bad128faeef82f44e99aa64085c94', 
        value: web3.utils.toWei('1', 'ether')
    });
}