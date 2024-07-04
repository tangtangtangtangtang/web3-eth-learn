/**
 * @description 和智能合约交互
 */
import { Web3 } from 'web3'
import { account } from './main'

const web3 = new Web3('https://eth.llamarpc.com');

// Uniswap token smart contract address (Mainnet)
const address = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'

// you can find the complete ABI on etherscan.io
// https://etherscan.io/address/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984#code
const ABI = 
[
    {
      name: 'symbol',
      outputs: [{ type: 'string' }],
      type: 'function',
    },
    {
      name: 'totalSupply',
      outputs: [{ type: 'uint256' }],
      type: 'function',
    },
];

// instantiate the smart contract
const uniswapToken = new web3.eth.Contract(ABI, address);


const read = async () => {
    // make the call to the contract
    const symbol = await uniswapToken.methods.symbol().call();

    console.log('Uniswap symbol:',symbol);
    // ↳ Uniswap symbol: UNI

    // make the call to the contract
    const totalSupply = await uniswapToken.methods.totalSupply().call();

    console.log('Uniswap Total supply:', totalSupply);
    // ↳ Uniswap Total Supply: 1000000000000000000000000000n
}

const write = async () => {
    // address to send the token
    const to = '0xcf185f2F3Fe19D82bFdcee59E3330FD7ba5f27ce';

    // value to transfer (1 with 18 decimals)
    const value = web3.utils.toWei('1','ether');

    // send the transaction => return the Tx receipt
    const txReceipt = await uniswapToken.methods.transfer(to,value).send({from: account[0].address});

    console.log('Tx hash:',txReceipt.transactionHash);
    // ↳ Tx hash: 0x14273c2b5781cc8f1687906c68bfc93482c603026d01b4fd37a04adb6217ad43
}

const events = async () => {
    // TODO @tangxiaozhuo Transfer Events不能获取？
    const eventTransfer = await uniswapToken.getPastEvents('allEvents', { fromBlock: 18850576 });

    // subscribe
    // create the subscription to all the 'Transfer' events
    const subscription = uniswapToken.events.Transfer();
    // listen to the events
    subscription.on('data',console.log);
}