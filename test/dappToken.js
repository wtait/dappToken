var DappToken = artifacts.require("./dappToken.sol");

contract('DappToken', function(accounts) {

    it('sets the total supply upon deployment', function() {
        return DappToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            console.log(totalSupply);
            assert.equal(totalSupply.toNumber(), 1000000, "Sets token total supply at one million");
        });
    })



})