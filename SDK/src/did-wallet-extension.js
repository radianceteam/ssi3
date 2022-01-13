const { DidStorageContract } = require("./contract-package/DidStorage.js");
const { DidDocumentContract } = require("./contract-package/DidDocument.js");

const { ProviderRpcClient, RawProviderApiResponse } = require("ton-inpage-provider");

const ed = require("noble-ed25519");
const sha256 = require("crypto-js/sha256.js");

// todo check addressDidStorage (test or main net) by extension????
const config = require('./config/config.json');

const ton = new ProviderRpcClient();

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

async function initSettings(network){

    console.log('initialize');

    if (!(await ton.hasProvider())) {
        throw new Error('Extension is not installed');
    }

    await ton.ensureInitialized();

    const {accountInteraction} = await ton.rawApi.requestPermissions({
        permissions: ['tonClient', 'accountInteraction']
    });

    console.log(accountInteraction);


    if (accountInteraction == null) {
        throw new Error('Insufficient permissions');
    }

    const networkParams = config.listNetwork[network];

    settings.accountInteraction = accountInteraction;
    settings.addressDidStorage = networkParams.storageRoot;

    return accountInteraction;
}



async function signData(msg){

    const msgHash = btoa(msg);

    let signData = await ton.rawApi.signData({
        data: msgHash,
        publicKey: settings.accountInteraction.publicKey,
    });

    return signData.signatureHex;
}

async function verifyMessage(signatureHex, msg){

    const msgHash = sha256(msg).toString();

    return await ed.verify(signatureHex, msgHash, settings.accountInteraction.publicKey);
}

// async function verifyMessage(signatureHex, msg){
//
//     const msgHash = btoa(msg);
//
//     let checkVerify = await ton.rawApi.verifySignature({
//         dataHash: msgHash,
//         publicKey: settings.accountInteraction.publicKey,
//         signature: signatureHex
//     });
//
//     return checkVerify.isValid;
// }

async function Timeout() {
    const time = 15000;
    console.log('wait.....(' + time + ' ms)');
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time, undefined)
    })
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

async function sendMsgAddDID(didDocument) {

    try {

        const response = await ton.rawApi.sendMessage({
            sender: settings.accountInteraction.address,
            recipient: settings.addressDidStorage,
            amount: '500000000',
            bounce: true,
            payload: {
                abi: JSON.stringify(DidStorageContract.abi),
                method: 'addDid',
                params: {
                    pubKey: "0x"+settings.accountInteraction.publicKey,
                    didDocument: JSON.stringify(didDocument),
                    addr: settings.accountInteraction.address
                }
            }
        });

        // console.log(response);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

async function sendMsgInitDid(addressDidDoc) {

    try{

        const resInit = await ton.rawApi.sendExternalMessage({
            local: false,
            publicKey: settings.accountInteraction.publicKey,
            recipient: addressDidDoc,
            payload: {
                abi: JSON.stringify(DidDocumentContract.abi),
                method: 'init',
                params: {
                    issuerAddr: settings.accountInteraction.address
                }
            }
        });

        // console.log(resInit);
        return true;
    } catch(e) {
        console.error(e);
        return false;
    }
}

async function createDID(didDocument) {

    console.log('create and init Did Document');

    let pubKey = settings.accountInteraction.publicKey;

    const addressDidDoc = await getDidDocumentAddress(pubKey);

    if (!addressDidDoc) return false;

    let didDocumentInfo = await getDidDocumentInfo(addressDidDoc);

    if (didDocumentInfo && Number(didDocumentInfo.status)) {
        console.log('did had already created');
        return false;
    }

    if(!didDocumentInfo) {
        console.log('send msg for create did');
        const res = await sendMsgAddDID(didDocument);

        if(!res) return false;

        // todo wait for transaction or check if did was created

        await Timeout();
    }

    console.log('send msg for init did');
    const res1 = await sendMsgInitDid(addressDidDoc);

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

async function createDIDDefault() {

    let pubKey = settings.accountInteraction.publicKey;

    const newDIDDoc = createNewDidDocumentJson(pubKey);

    return await createDID(newDIDDoc);

}

async function sendMsgNewDidDocument(addressDidDoc, newDidDocument) {
    try {
        const response = await ton.rawApi.sendMessage({
            sender: settings.accountInteraction.address,
            recipient: addressDidDoc,
            amount: '300000000',
            bounce: true,
            payload: {
                abi: JSON.stringify(DidDocumentContract.abi),
                method: 'newDidDocument',
                params: {
                    didDocument: JSON.stringify(newDidDocument)
                }
            }
        });

        // console.log(response);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

function compareDidDocument(didDocumentInfo, newDidDocument) {
    return didDocumentInfo.didDocument == JSON.stringify(newDidDocument);
}

async function updateDIDDocument(addressDidDoc, newDidDocument) {

    console.log('update Did Document');

    const didDocumentInfo = await getDidDocumentInfo(addressDidDoc);

    if (!didDocumentInfo) return false;

    if (compareDidDocument(didDocumentInfo, newDidDocument)) return true;

    const res = await sendMsgNewDidDocument(addressDidDoc, newDidDocument);

    if(!res) return false;

    //todo check after, remove timeOut
    await Timeout();

    const didDocumentInfoNew = await getDidDocumentInfo(addressDidDoc);

    if (compareDidDocument(didDocumentInfoNew, newDidDocument)) {
        console.log('did Document was changed');
        return true;
    }

    console.error('did Document was not changed');
    return false;
}

async function sendMsgNewDidStatus(addressDidDoc, newDidStatus) {
    try {
        const response = await ton.rawApi.sendMessage({
            sender: settings.accountInteraction.address,
            recipient: addressDidDoc,
            amount: '300000000',
            bounce: true,
            payload: {
                abi: JSON.stringify(DidDocumentContract.abi),
                method: 'newDidStatus',
                params: {
                    status: Number(newDidStatus)
                }
            }
        });

        // console.log(response);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

function compareStatusDidDocument(didDocumentInfo, newStatus) {
    return Number(didDocumentInfo.status) == Number(newStatus);
}

async function updateDidStatus(addressDidDoc, newStatus) {

    console.log('update did status');

    const didDocumentInfo = await getDidDocumentInfo(addressDidDoc);

    if (!didDocumentInfo) return false;

    if (compareStatusDidDocument(didDocumentInfo, newStatus)) return true;

    const res = await sendMsgNewDidStatus(addressDidDoc, newStatus);

    if(!res) return false;

    //todo check after, remove timeOut
    await Timeout();

    const didDocumentInfoNew = await getDidDocumentInfo(addressDidDoc);

    if (compareStatusDidDocument(didDocumentInfoNew, newStatus)) {
        console.log('status was changed');
        return true;
    }

    console.error('status was not changed');
    return false;
}

async function sendMsgNewDidIssuerAddress(addressDidDoc, newDidIssuerAddress) {
    try {
        const response = await ton.rawApi.sendMessage({
            sender: settings.accountInteraction.address,
            recipient: addressDidDoc,
            amount: '300000000',
            bounce: true,
            payload: {
                abi: JSON.stringify(DidDocumentContract.abi),
                method: 'newDidIssuerAddr',
                params: {
                    issuerAddr: newDidIssuerAddress
                }
            }
        });

        // console.log(response);

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

function compareIssuerAddrDidDocument(didDocumentInfo, newDidIssuerAddress) {
    return didDocumentInfo.issuerAddr == newDidIssuerAddress;
}

async function updateDidIssuerAddress(addressDidDoc, newDidIssuerAddress) {

    console.log('update Issuer Address');

    const didDocumentInfo = await getDidDocumentInfo(addressDidDoc);

    if (!didDocumentInfo) return false;

    if (compareIssuerAddrDidDocument(didDocumentInfo, newDidIssuerAddress)) return true;

    const res = await sendMsgNewDidIssuerAddress(addressDidDoc, newDidIssuerAddress);

    if(!res) return false;

    //todo check after, remove timeOut
    await Timeout();

    const didDocumentInfoNew = await getDidDocumentInfo(addressDidDoc);

    if (compareIssuerAddrDidDocument(didDocumentInfoNew, newDidIssuerAddress)) {
        console.log('issuerAddr was changed');
        return true;
    }

    console.error('issuerAddr was not changed');
    return false;

}

async function sendMsgDeleteDidDocument(addressDidDoc) {
    try {
        const response = await ton.rawApi.sendMessage({
            sender: settings.accountInteraction.address,
            recipient: addressDidDoc,
            amount: '300000000',
            bounce: true,
            payload: {
                abi: JSON.stringify(DidDocumentContract.abi),
                method: 'deleteDidDocument',
                params: {}
            }
        });

        // console.log(response);

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

async function deleteDidDocument(addressDidDoc) {

    console.log('delete Did Document');

    const res = await sendMsgDeleteDidDocument(addressDidDoc);

    if(!res) return false;

    //todo check after, remove timeOut
    await Timeout();

    const didDocumentInfo = await getDidDocumentInfo(addressDidDoc);

    if (!didDocumentInfo) {
        console.log('deleted');
        return true;
    }

    console.error('not deleted');
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

async function getDidDocumentAddress(didMethod) {

    try{
        const {output} = await ton.rawApi.runLocal({
            address: settings.addressDidStorage,
            functionCall: {
                abi: JSON.stringify(DidStorageContract.abi),
                method: 'resolveDidDocument',
                params: {
                    id: "0x" + didMethod
                }
            }
        });

        return output.addrDidDocument;

    } catch(e) {
        console.error(e);
    }

}

async function getDidDocumentInfo(addressDidDoc) {

    try{

        const outputs = await ton.rawApi.runLocal({
            address: addressDidDoc,
            functionCall: {
                abi: JSON.stringify(DidDocumentContract.abi),
                method: 'getDid',
                params: {}
            }
        });

        const didDocumentInfo = outputs.output.value0;

        console.log(didDocumentInfo);

        return didDocumentInfo;

    } catch(e) {
        // console.log(e);
        console.error("Did Document not found");
    }
}