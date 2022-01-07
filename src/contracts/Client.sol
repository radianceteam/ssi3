pragma ton-solidity >=0.43.0;

pragma AbiHeader expire;
pragma AbiHeader time;

contract client {

    constructor() public {
        tvm.accept();
    }

    modifier onlyOwner() {
        require(msg.pubkey() == tvm.pubkey());
        _;
    }

    function sendTransaction(address dest, uint128 value, bool bounce, uint8 flags, TvmCell payload) public onlyOwner() {
        tvm.accept();
        dest.transfer(value, bounce, flags, payload);
    }

    function deleteContract() public onlyOwner() {
        tvm.accept();
        selfdestruct(msg.sender);
    }

    function getPubKey() public view returns(uint256 pubkey) {
        tvm.accept();
        return msg.pubkey();
    }

    

}