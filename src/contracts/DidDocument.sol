pragma ton-solidity >=0.43.0;

pragma AbiHeader expire;
pragma AbiHeader time;
pragma AbiHeader pubkey;

import './interfaces/IDidDocument.sol';

import './libraries/Constants.sol';


contract DidDocument is IDidDocument {

    DIDItem _didItem;
    address _addrDidStorage;
    

    uint256 static _id;

    constructor(uint256 pubKey, string didDocument) public {
        optional(TvmCell) optSalt = tvm.codeSalt(tvm.code());
        require(optSalt.hasValue(), 101);
        (address addrDidStorage) = optSalt.get().toSlice().decode(address);
        require(msg.sender == addrDidStorage);
        require(msg.value >= Constants.MIN_FOR_DEPLOY);
        tvm.rawReserve(Constants.MIN_FOR_CONTRACT + 0.02 ton, 2);
        tvm.accept();
        _addrDidStorage = addrDidStorage;

        DIDItem newItem;
        newItem.status = 0;
        newItem.didDocument = didDocument;
        newItem.PubKey = pubKey;

        _didItem = newItem;

        msg.sender.transfer({value: 0, flag: 128});
    }

    modifier onlyOwner() {
        require(msg.sender == _didItem.issuerAddr, 102);
        _;
    }

    function init(address issuerAddr) public {
        require(msg.pubkey() == _didItem.PubKey);
        require(_didItem.issuerAddr == address(0));
        tvm.accept();
        _didItem.issuerAddr = issuerAddr;
        _didItem.status = 1;
    }

    function newDidDocument(string didDocument) public override onlyOwner() {
        tvm.rawReserve(Constants.MIN_FOR_CONTRACT, 2);
        _didItem.didDocument = didDocument;
        msg.sender.transfer({value: 0, flag: 128});
    }

    function newDidStatus(uint8 status) public onlyOwner() {
        tvm.rawReserve(Constants.MIN_FOR_CONTRACT, 2);
        _didItem.status = status;
        msg.sender.transfer({value: 0, flag: 128});
    }

    function newDidIssuerAddr(address issuerAddr) public override onlyOwner() {
        tvm.rawReserve(Constants.MIN_FOR_CONTRACT, 2);
        _didItem.issuerAddr = issuerAddr;
        msg.sender.transfer({value: 0, flag: 128});
    }

    function deleteDidDocument() public override onlyOwner() {
        selfdestruct(msg.sender);
    }

    function getDid() public view override returns (DIDItem) {
        return _didItem;
    }

    function getInfo() public view override returns (
        address addrDidStorage,
        DIDItem didItem
    ) {
        addrDidStorage = _addrDidStorage;
        didItem = _didItem;
    }
}