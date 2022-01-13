const { TonClient, signerNone, abiContract, signerKeys } = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");

const { Account } = require("@tonclient/appkit");

TonClient.useBinaryLibrary(libNode);

const client = new TonClient({network: {endpoints: ["net.ton.dev"]}});

const core = require('../src/did-client-core.js');

const { GiverContract } = require("../src/contract-package/Giver.js");

const { ClientContract } = require("../src/contract-package/Client.js");

const giverParams = require( './GiverContract.json');


const valueForClientWalletFirst = 2000000000;
const valueForClientWalletSecond = 1000000000;

const arrayResultTest = [];

function outputResultTest(msg, bool) {
    console.log();
    console.log('======================================================');
    console.log(msg);

    if(bool) {
        console.log('success');
    }else{
        console.log('failed');
    }
    console.log('======================================================');
    console.log();

    arrayResultTest.push({
        status: bool,
        msg: msg
    })
}

async function main() {

    outputResultTest('start tests', true);

    core.initSettings("devNet", client);

    console.log('create client wallet for test');

    const walletDidParams = await deployWallet(valueForClientWalletFirst);

    console.log(walletDidParams);

    const pubKeyWallet = walletDidParams.keys.keys.public;

    const walletDidAcc = new Account(ClientContract, {
        address: walletDidParams.address,
        signer: walletDidParams.keys,
        client,
    });

    let res;

    const newDidDocumentJson = core.createNewDidDocumentJson(pubKeyWallet);

    res = await core.createDID(
        walletDidAcc,
        pubKeyWallet,
        walletDidParams.address,
        walletDidParams.keys.keys,
        newDidDocumentJson
    );

    outputResultTest('Test 1 - Create did smart-contract', res === true);

    const addressDidDocument = await core.getDidDocumentAddress(pubKeyWallet);

    const didStr = core.getDidFromMethod(pubKeyWallet);

    console.log('did was created: "' + didStr + '"');

    console.log('address didDocument: '+ addressDidDocument);


    res = await core.resolveDIDDocument(didStr);

    console.log(res);

    outputResultTest('Test 2 - resolve did', JSON.stringify(res) === JSON.stringify(newDidDocumentJson));

    newDidDocumentJson.createdAt = new Date().getTime().toString();

    res = await core.updateDIDDocument(walletDidAcc, addressDidDocument, newDidDocumentJson);

    outputResultTest('Test 3 - update json did document', res === true);

    const newStatus = 0;
    res = await core.updateDidStatus(walletDidAcc, addressDidDocument, newStatus)

    outputResultTest('Test 4 - update status of did document smart-contract', res === true);

    const walletDidParamsSecond = await deployWallet(valueForClientWalletSecond);

    console.log(walletDidParamsSecond);

    const newIssuerAddress = walletDidParamsSecond.address;

    res = await core.updateDidIssuerAddress(walletDidAcc, addressDidDocument, newIssuerAddress)

    outputResultTest('Test 5 - update Issuer Address of did document smart-contract', res === true);

    const walletDidSecondAcc = new Account(ClientContract, {
        address: walletDidParamsSecond.address,
        signer: walletDidParamsSecond.keys,
        client,
    });

    res = await core.deleteDidDocument(walletDidSecondAcc, addressDidDocument)

    outputResultTest('Test 6 - delete did document smart-contract', res === true);

    const checkSignature = '1730b221318a335f494d5ebe89ee0e7e18cfde3dbba559043b21183938bd960c8f7c5795e0c0aefa0476cc65e66cfc69df441678e8db36427062310314e22f0d';

    const keysForSignData = giverParams.keys.keys;

    console.log(keysForSignData);

    const msg = 'need sign data';

    console.log(msg);


    const signature = await core.signData(msg, keysForSignData.secret);

    console.log(signature);

    outputResultTest('Test 7 - sign data', checkSignature === signature.toString());

    const verify = await core.verifyMessage(signature, msg, keysForSignData.public);

    console.log(verify);

    outputResultTest('Test 8 - verify signature', verify === true);

    console.log('tests are completed');

    console.log('Result of tests');

    arrayResultTest.forEach((el) => {
        console.log(el.msg + ': ' + (el.status ? 'success' : 'failed'))
    })
}

(async () => {
    try {
        await main();
    } catch (error) {
        if (error.code === 504) {
            console.error(`Network is inaccessible. Pls check connection`);
        } else {
            console.error(error);
        }
    }
    client.close();
    process.exit(0);
})();

async function deployWallet(valueFromGiver) {
    let response;
    const SEED_PHRASE_WORD_COUNT = 12;
    const SEED_PHRASE_DICTIONARY_ENGLISH = 1;
    const HD_PATH = "m/44'/396'/0'/0/0";
    const { crypto } = client;
    const { phrase } = await crypto.mnemonic_from_random({
        dictionary: SEED_PHRASE_DICTIONARY_ENGLISH,
        word_count: SEED_PHRASE_WORD_COUNT,
    });
    console.log(`Generated seed phrase "${phrase}"`);
    let keyPair = await crypto.mnemonic_derive_sign_keys({
        phrase,
        path: HD_PATH,
        dictionary: SEED_PHRASE_DICTIONARY_ENGLISH,
        word_count: SEED_PHRASE_WORD_COUNT,
    });
    const rootKeys = signerKeys(keyPair);

    console.log(rootKeys);

    const walletDidAcc = new Account(ClientContract, {
        signer: rootKeys,
        client,
    });

    const address = await walletDidAcc.getAddress();
    console.log(`Future address of the contract will be: ${address}`);

    const deployMessage = await client.abi.encode_message(await walletDidAcc.getParamsOfDeployMessage({
        initFunctionName:"constructor",
        initInput:{ },
    }));

    // const keyJson = JSON.stringify({address:address, keys:rootKeys, seed:phrase});
    // fs.writeFileSync( pathWalletDidJson, keyJson,{flag:'w'});
    //
    // console.log("Future address of the contract  and keys written successfully to:", pathWalletDidJson);


    const giverAccount = new Account(GiverContract, {
        address: giverParams.address,
        signer: giverParams.keys,
        client
    });

    // Call `sendTransaction` function
    response = await giverAccount.run("sendTransaction", {dest:address,value:valueFromGiver,bounce:false});
    console.log("Giver send " + (valueFromGiver/1000000000).toString() + " ton to client Wallet:", address);


    let shard_block_id;
    shard_block_id = (await client.processing.send_message({
            message: deployMessage.message,
            send_events: true,
        }, logEvents,
    )).shard_block_id;
    console.log(`Deploy message was sent.`);

    // Monitor message delivery.
    // See more info about `wait_for_transaction` here
    // https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_processing.md#wait_for_transaction
    const deploy_processing_result = await client.processing.wait_for_transaction({
            abi: abiContract(ClientContract.abi),
            message: deployMessage.message,
            shard_block_id: shard_block_id,
            send_events: true,
        },
        logEvents,
    );
    // console.log(`Deploy transaction: ${JSON.stringify(deploy_processing_result.transaction, null, 2)}`);
    // console.log(`Deploy fees: ${JSON.stringify(deploy_processing_result.fees, null, 2)}`);
    console.log(`Contract was deployed at address: ${address}`);

    return {address:address, keys:rootKeys, seed:phrase};
}

async function logEvents(params, response_type) {
    // console.log(`params = ${JSON.stringify(params, null, 2)}`);
    // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}