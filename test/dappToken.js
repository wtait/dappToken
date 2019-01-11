var DappToken = artifacts.require("./dappToken.sol");

contract('DappToken', function(accounts) {
//tests here
it('sets the total supply upon deployment', function() {
    DappToken.deployed().then(function(instance){
        tokenInstance = instance;
        return tokenInstance.totalSupply();
    }).then(function(totalSupply) {
        assert.equal(totalSupply.toNumber(), 1000000, "Sets token total supply at one million");
    });
});


})