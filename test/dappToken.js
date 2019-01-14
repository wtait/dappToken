var DappToken = artifacts.require("./dappToken.sol");

contract('DappToken', function(accounts) {

    it('sets the total supply upon deployment', function() {
        return DappToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            console.log(totalSupply);
            assert.equal(totalSupply.toNumber(), 1000000, "Sets token total supply at one million");
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance) {
            assert.equal(adminBalance.toNumber(), 1000000, "Allocates total supply of initial coins to admin");
        });
    });



})