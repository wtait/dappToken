pragma solidity >=0.4.21 <0.6.0;

contract DappToken {

    string public name = "Dapps";

    string public symbol = "DAPP";
 
    string public standard = "Dapps v1.0";

    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    //emit event upon successfull transfers
    event Transfer(
        address indexed _from, 
        address indexed _to, 
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender, 
        uint256 _value
    );

    constructor (uint256 _initialSupply) public {
        totalSupply = _initialSupply;
        balanceOf[msg.sender] = _initialSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success){ 

        //ensure sender has enough tokens
        require(_value <= balanceOf[msg.sender], "insufficient funds");

        //withdraw tokens from sender
        balanceOf[msg.sender] -= _value;

        //deposit tokens to receiver
        balanceOf[_to] += _value;

        //fire transfer event
        emit Transfer(msg.sender, _to, _value);

        //return boolean
        return true;
    }

    function approve (address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
       
        //fire Approve event
        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function transferFrom (address _from, address _to, uint256 _value) public returns (bool success) {
        //code here
    }

}