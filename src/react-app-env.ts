import { MetaMaskProvider, Web3APISpec } from "web3";

/// <reference types="react-scripts" />

declare global {
  interface Window {
    ethereum: MetaMaskProvider<Web3APISpec>;
  }
}