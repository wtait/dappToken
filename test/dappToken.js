var DappToken = artifacts.require("./dappToken.sol");

contract('DappToken', function (accounts) {

    it('initializes contract with the correct name', function() {
        return DappToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name) {
            assert.equal(name, 'Dapps', 'is named Dapps');
            return tokenInstance.symbol();
        }).then(function(symbol) {
            assert.equal(symbol, 'DAPP', 'symbol is DAPP');
            return tokenInstance.standard();
        }).then(function(standard) {
            assert.equal(standard, 'Dapps v1.0', 'correctly describes standard version')
        })
    });

    it('sets the total supply upon deployment', function () {
        return DappToken.deployed().then(function (instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function (totalSupply) {
            console.log(totalSupply);
            assert.equal(totalSupply.toNumber(), 1000000, "Sets token total supply at one million");
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function (adminBalance) {
            assert.equal(adminBalance.toNumber(), 1000000, "Allocates total supply of initial coins to admin");
        });
    });

    it('transfers tokens', function () {

        // transfer
        // Transfers _value amount of tokens to address _to, and MUST fire the Transfer event.The function SHOULD throw if the _from account balance does not have enough tokens to spend.

        // Note Transfers of 0 values MUST be treated as normal transfers and fire the Transfer event.

        // function transfer(address _to, uint256 _value) public returns(bool success)
        return DappToken.deployed().then(function(instance) {
            tokenInstance = instance;
            //require transfer sender has sufficient funds
            return tokenInstance.transfer.call(accounts[1], 1000001);
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
            return tokenInstance.transfer(accounts[1], 500001, {from: accounts[0]});
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, 'event logs exist');
            assert.equal(receipt.logs[0].event, 'Transfer', 'the transfer event fired');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the address of the sender');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the address of the receiver');
            assert.equal(receipt.logs[0].args._value, 500001, 'logs the correct transfer amount');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balanceReceiver) {
            assert.equal(balanceReceiver.toNumber(), 500001, 'recepient receives correct funds');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balanceSender) {
            assert.equal(balanceSender.toNumber(), 499999, 'sender is debited correct amount');
        })
    });

})