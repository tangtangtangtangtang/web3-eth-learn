// SPDX-License-Identifier: MIT

pragma solidity 0.8.26;

contract Counter{
    //variables
    uint256 private number;

    //constructor
    constructor(uint256 _startingNumber) {
        number = _startingNumber;
    }

    //functions
    function increase() external {
        number++;
    }

    function getNumber() external view returns(uint256){
        return number;
    }

}  