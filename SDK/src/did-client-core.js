const { TonClient, signerNone, signerKeys } = require("@tonclient/core");
const { Account } = require("@tonclient/appkit");

const { DidStorageContract } = require( "./contract-package/DidStorage.js");
const { DidDocumentContract } = require("./contract-package/DidDocument.js");


const ed = require("noble-ed25519");
const sha256 = require("crypto-js/sha256.js");


const config = require( './config/config.json');

module.exports = {
    initSettings,
    signData,
    verifyMessage,
    createNewDidDocumentJson,
    createDID,
    createDIDDefault,
    resolveDIDDocument,
    updateDIDDocument,
    deleteDidDocument,
    updateDidStatus,
    updateDidIssuerAddress,
    getDidDocumentAddress,
    getDidDocumentInfo,
    getDidMethod,
    getDidFromMethod
}

const settings = {}

function initSettings(network, client) {

    const networkParams = config.listNetwork[network];

    console.log('initialize');

    console.log(networkParams);

    settings.client = client;
    settings.addressDidStorage = networkParams.storageRoot;
}

async function signData(msg, secretKey){

    const msgHash = sha256(msg).toString();

    return await ed.sign(msgHash, secretKey);
}

async function verifyMessage(signatureHex, msg, publicKey){

    const msgHash = sha256(msg).toString();

    return await ed.verify(signatureHex, msgHash, publicKey);
}

function createNewDidDocumentJson(pubKey){
    return {
        id: "did:everscale:" + pubKey.toString(),
        //createdAt: new Date().getTime().toString(),
        "@context": [
            "https://www.w3.org/ns/did/v1",
            "https://w3id.org/security/suites/ed25519-2020/v1",
        ],
        publicKey: pubKey.toString(),
        verificationMethod: {
            id: "did:everscale:" + pubKey.toString(),
            type: "Ed25519VerificationKey2020",
            controller: "did:everscale:" + pubKey.toString(),
            publicKeyMultibase: pubKey,
        },
    };
}

async function sendMsgPayload(accWallet, destAddress, valueEver, body) {
    try {

        const res = await accWallet.run("sendTransaction", {
            dest: destAddress,
            value: valueEver,
            bounce: true,
            flags: 3,
            payload: body,
        });

        console.log(res.transaction.lt);
        return res.transaction.lt;
    } catch (e) {
        console.error(e);
        return false;
    }
}

async function sendMsgAddDID(accWallet, pubKey, didDocument) {
    try {

        const { body } = await settings.client.abi.encode_message_body({
            abi: { type: "Contract", value: DidStorageContract.abi },
            signer: { type: "None" },
            is_internal: true,
            call_set: {
                function_name: "addDid",
                input: {
                    pubKey: "0x" + pubKey,
                    didDocument: JSON.stringify(didDocument)
                },
            },
        });

        return await sendMsgPayload(accWallet, settings.addressDidStorage, 500000000, body);

    } catch (e) {
        console.error(e);
        return false;
    }
}

async function sendMsgInitDID(accDidDocument, addressIssuer, didKeys) {
    try{

        const resInit = await accDidDocument.run("init", {
            issuerAddr: addressIssuer
        }, {
            signer: signerKeys(didKeys)
        })

        // console.log(resInit);

        return true;
    } catch(e) {
        console.error(e);
        return false;
    }
}

async function createDIDDefault(accWallet, pubKey, addressIssuer, clientKeys) {

    const newDIDDoc = createNewDidDocumentJson(pubKey);

    return await createDID(accWallet, pubKey, addressIssuer, clientKeys, newDIDDoc);

}

// async function Timeout() {
//     const time = 20000;
//     // console.log('wait.....(' + time + ' ms)');
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, time, undefined)
//     })
// }

async function createDID(accWallet, pubKey, addressIssuer, clientKeys, didDocument) {

    console.log('create and init Did Document');

    const addressDidDoc = await getDidDocumentAddress(pubKey);

    if (!addressDidDoc) return false;

    let didDocumentInfo = await getDidDocumentInfo(addressDidDoc);

    if (didDocumentInfo && Number(didDocumentInfo.status)) {
        console.log('did had already created');
        return false;
    }


    if(!didDocumentInfo) {
        console.log('send msg for create did');
        const res = await sendMsgAddDID(accWallet, pubKey, didDocument);

        if(!res) return false;

        console.log('Wait for transaction');
        const waitAccount = await settings.client.net.wait_for_collection({
            collection: "accounts",
            filter: {
                id: { eq: addressDidDoc },
            },
            result: "boc",
            timeout: 60000
        });
    }


    const accDidDocument = getDidDocumentAccount (addressDidDoc);

    console.log('send msg for init did');
    const res1 = await sendMsgInitDID(accDidDocument, addressIssuer, clientKeys);

    if(!res1) return false;

    didDocumentInfo = await getDidDocumentInfo(addressDidDoc);

    if (Number(didDocumentInfo.status)) {
        console.log('init executed');
        return true;
    }else{
        console.error('init failed');
    }

    return false;
}


async function getMsgBodyNewDidDocument(newDidDocument){
    const {body} = await settings.client.abi.encode_message_body({
        abi: {type: "Contract", value: DidDocumentContract.abi},
        signer: {type: "None"},
        is_internal: true,
        call_set: {
            function_name: "newDidDocument",
            input: {
                didDocument: JSON.stringify(newDidDocument),
            },
        },
    });
    console.log(body);
    return body;
}

// async function waitMsgUpdateContract (accWallet, addressDidDoc, body) {
//     console.log('Wait for transaction');
//     const waitAccount = await settings.client.net.wait_for_collection({
//         collection: "messages",
//         filter: {
//             src: { eq: accWallet.address },
//             dst: { eq: addressDidDoc },
//             body: { eq: body }
//         },
//         result: "boc",
//         timeout: 60000
//     });
// }

async function waitForAccountUpdate(address, transLt) {
    console.log('Waiting for did document update');
    const startTime = Date.now();
    const account = await settings.client.net.wait_for_collection({
        collection: 'accounts',
        filter: {
            id: { eq: address },
            last_trans_lt: { gt: transLt },
        },
        result: 'data',
    });
    const duration = Math.floor((Date.now() - startTime) / 1000);
    console.log(`Success. Did document ${address} was updated, it took ${duration} sec.\n`);
    return account;
}

function compareDidDocument(didDocumentInfo, newDidDocument) {
    return didDocumentInfo.didDocument == JSON.stringify(newDidDocument);
}

async function updateDIDDocument(accWallet, addressDidDoc, newDidDocument) {

    console.log('update Did Document');

    const didDocumentInfo = await getDidDocumentInfo(addressDidDoc);

    if (!didDocumentInfo) return false;

    if (compareDidDocument(didDocumentInfo, newDidDocument)) return true;

    const body = await getMsgBodyNewDidDocument(newDidDocument);

    const resLt = await sendMsgPayload(accWallet, addressDidDoc, 300000000, body);

    if(!resLt) return false;

    await waitForAccountUpdate (addressDidDoc, resLt);

    const didDocumentInfoNew = await getDidDocumentInfo(addressDidDoc);

    if (compareDidDocument(didDocumentInfoNew, newDidDocument)) {
        console.log('did Document was changed');
        return true;
    }

    console.error('did Document was not changed');
    return false;
}

async function getBodyNewDidStatus(newDidStatus) {
    const {body} = await settings.client.abi.encode_message_body({
        abi: {type: "Contract", value: DidDocumentContract.abi},
        signer: {type: "None"},
        is_internal: true,
        call_set: {
            function_name: "newDidStatus",
            input: {
                status: Number(newDidStatus),
            },
        },
    });
    console.log(body);
    return body;
}

function compareStatusDidDocument(didDocumentInfo, newStatus) {
    return Number(didDocumentInfo.status) == Number(newStatus);
}

async function updateDidStatus(accWallet, addressDidDoc, newStatus) {

    console.log('update did status');

    const didDocumentInfo = await getDidDocumentInfo(addressDidDoc);

    if (!didDocumentInfo) return false;

    if (compareStatusDidDocument(didDocumentInfo, newStatus)) return true;

    const body = await getBodyNewDidStatus(newStatus);

    const resLt = await sendMsgPayload(accWallet, addressDidDoc, 300000000, body);

    if(!resLt) return false;

    await waitForAccountUpdate (addressDidDoc, resLt);

    const didDocumentInfoNew = await getDidDocumentInfo(addressDidDoc);

    if (compareStatusDidDocument(didDocumentInfoNew, newStatus)) {
        console.log('status was changed');
        return true;
    }

    console.error('status was not changed');
    return false;
}

async function getMsgBodyNewDidIssuerAddress(newDidIssuerAddress) {

    const {body} = await settings.client.abi.encode_message_body({
        abi: {type: "Contract", value: DidDocumentContract.abi},
        signer: {type: "None"},
        is_internal: true,
        call_set: {
            function_name: "newDidIssuerAddr",
            input: {
                issuerAddr: newDidIssuerAddress
            },
        },
    });
    console.log(body);
    return body;
}

function compareIssuerAddrDidDocument(didDocumentInfo, newDidIssuerAddress) {
    return didDocumentInfo.issuerAddr == newDidIssuerAddress;
}

async function updateDidIssuerAddress(accWallet, addressDidDoc, newDidIssuerAddress) {

    console.log('update Issuer Address');

    const didDocumentInfo = await getDidDocumentInfo(addressDidDoc);

    if (!didDocumentInfo) return false;

    if (compareIssuerAddrDidDocument(didDocumentInfo, newDidIssuerAddress)) return true;


    const body = await getMsgBodyNewDidIssuerAddress(newDidIssuerAddress);

    const resLt = await sendMsgPayload(accWallet, addressDidDoc, 300000000, body);

    if(!resLt) return false;


    await waitForAccountUpdate (addressDidDoc, resLt);


    const didDocumentInfoNew = await getDidDocumentInfo(addressDidDoc);

    if (compareIssuerAddrDidDocument(didDocumentInfoNew, newDidIssuerAddress)) {
        console.log('issuerAddr was changed');
        return true;
    }

    console.error('issuerAddr was not changed');

    return false;
}

async function getMsgBodyDeleteDidDocument() {
    const {body} = await settings.client.abi.encode_message_body({
        abi: {type: "Contract", value: DidDocumentContract.abi},
        signer: {type: "None"},
        is_internal: true,
        call_set: {
            function_name: "deleteDidDocument",
            input: {},
        },
    });
    console.log(body);
    return body;
}

async function deleteDidDocument(accWallet, addressDidDoc) {

    console.log('delete Did Document');

    const body = await getMsgBodyDeleteDidDocument();

    const resLt = await sendMsgPayload(accWallet, addressDidDoc, 300000000, body);

    if(!resLt) return false;

    console.log('Wait for transaction');
    const waitAccount = await settings.client.net.wait_for_collection({
        collection: "accounts",
        filter: {
            id: { eq: addressDidDoc },
            acc_type:{eq: 3}
        },
        result: "boc",
        timeout: 60000
    });

    const didDocumentInfo = await getDidDocumentInfo(addressDidDoc);

    if (!didDocumentInfo) {
        console.log('did document was deleted');
        return true;
    }

    console.error('did document was not deleted');
    return false;
}

async function resolveDIDDocument(did) {

    console.log('resolve did');

    const didMethod = getDidMethod(did);

    console.log(didMethod);

    const addressDidDoc = await getDidDocumentAddress(didMethod);

    if (!addressDidDoc) return;

    const didDocumentInfo = await getDidDocumentInfo(addressDidDoc);

    if (!didDocumentInfo) return;

    if (!checkStatusDidDocument(didDocumentInfo)) return;

    return JSON.parse(didDocumentInfo.didDocument);

}

function getDidMethod(did){
    return did.split(':')[2];
}

function getDidFromMethod(pubKey){
    return 'did:everscale:' + pubKey.toString();
}

function checkStatusDidDocument(didDocumentInfo) {
    return Number(didDocumentInfo.status);
}

function getDidStorageAccount () {
    return new Account(DidStorageContract, {
        address: settings.addressDidStorage,
        signer: signerNone(),
        client: settings.client,
    });
}

function getDidDocumentAccount (addressDidDoc) {
    return  new Account(DidDocumentContract, {
        address: addressDidDoc,
        signer: signerNone(),
        client: settings.client,
        useCachedState: false
    });
}

async function getDidDocumentAddress(didMethod) {

    const accDS = getDidStorageAccount();

    let resResolveDid;
    try{
        resResolveDid = await accDS.runLocal("resolveDidDocument", {
            id: "0x" + didMethod,
        });

    } catch {
        console.error("Incorrect format DID");
        return;
    }

    return resResolveDid.decoded.output.addrDidDocument;
}

async function getDidDocumentInfo(addressDidDoc) {

    try{
        const didAcc = getDidDocumentAccount (addressDidDoc);

        didAcc.refresh();

        const resDid = await didAcc.runLocal("getDid", {});

        const didDocumentInfo = resDid.decoded.output.value0;

        console.log(didDocumentInfo);

        return didDocumentInfo;

    } catch(e) {
        // console.log(e);
        console.error("DidDocument not found");
    }
}