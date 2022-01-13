pragma ton-solidity >=0.43.0;

pragma AbiHeader expire;
pragma AbiHeader time;

import './resolvers/DidDocumentResolver.sol';

contract DidStorage is DidDocumentResolver {

    uint256 _totalDid;

    constructor(TvmCell codeDidDocument) public {
        tvm.accept();
        _codeDidDocument = codeDidDocument;
    }

    function addDid(uint256 pubKey, string didDocument) public {
        require(msg.value >= 0.45 ton);
        TvmCell codeDidDocument = _buildDidDocumentCode();
        TvmCell stateDidDocument = _buildDidDocumentState(codeDidDocument, pubKey);
        tvm.rawReserve(address(this).balance - msg.value, 2);
        new DidDocument{stateInit: stateDidDocument, value: 0.4 ton}(pubKey, didDocument);

        _totalDid++;

        msg.sender.transfer({value: 0, flag: 128});

    }

    function signData(string data) public view returns (uint256) {
        return sha256(format("{}{}", data, msg.pubkey()));
    }

    function verifySignature(string data, uint256 signature) public view returns (bool) {
        return sha256(format("{}{}", data, msg.pubkey())) == signature;
    }
}
