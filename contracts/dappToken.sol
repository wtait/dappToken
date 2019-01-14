pragma solidity >=0.4.21 <0.6.0;

contract DappToken {

    string public name = "Dapps";

    string public symbol = "DAPP";

    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    constructor (uint256 _initialSupply) public {
        totalSupply = _initialSupply;
        balanceOf[msg.sender] = _initialSupply;
    }
}