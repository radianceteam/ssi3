const { Account } = require("@tonclient/appkit")
const { TonClient, signerKeys, signerNone } = require("@tonclient/core")
const { libNode } = require("@tonclient/lib-node")

const send = require("./scripts/sendMessage")
const api = require("./scripts/api")

const addrStorage = "0:7cf80f168aa7296355a4a96257138039c856bc6b8d8a39e1ca47674798e86926"
const { DidDocumentContract } = require("./build/DidDocumentContract")
const { DidStorageContract } = require("./build/DidStorageContract")
const { ClientContract } = require("./build/ClientContract")
TonClient.useBinaryLibrary(libNode)

const network = new TonClient({
    network: {
        endpoints: ["net.ton.dev"]
    }
})

const StorageContract = new Account(DidStorageContract, {
    address: addrStorage,
    signer: signerNone(),
    client: network
})

const client2 = new Account(ClientContract, {
    address: "0:d1e121837714fd4d8301ae82be2b2a8d6c6bfb8b1268fbebba9605fc6808af49",
    signer: signerKeys({
        public: 'fed01c09b6e5a3aa90b769ba7d4a92b8426522ebe5a79090fcea2d3f5caefb05',
        secret: '2598ee42937f0c07fd0c0bb2bd966da904359cb29964d18035615208a0245802'
      }),
    client: network
})

var didDocument = {
    "context": [
      "https://www.w3.org/ns/did/v1",
      "https://w3id.org/security/suites/ed25519-2020/v1"
    ],
    "id": "did:example:",
    "authentication": [{
      
      "id": "did:example:",
      "type": "Ed25519VerificationKey2020",
      "controller": "did:example:",
      "publicKeyMultibase": "zH3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
    }]
  }

var client
var DocumentContract

async function main() {

    try {
        console.log()
        console.log("Start of tests")
        console.log()
        await test1()
        console.log()
        await viewDidDocument("didDocument after creation:")
        await test2()
        await test3()
        console.log()
        await viewDidDocument("didDocument after all changes")
        console.log()
        console.log("All tests have been successfully completed")
    } catch(er) {
        console.log(er)
    }

}

async function test1() {
    console.log("Test 1: creating a did")
    try {
        await api.addDid(client, StorageContract, "0x" + client.signer.keys.public, JSON.stringify(didDocument))
        DocumentContract = await createDidDocumentContract()
        ress = await api.getDid(DocumentContract)
        console.log()
        if(JSON.stringify(didDocument) == ress.value0.didDocument) {
            console.log("Test1 was successfully completed. Did was created with our parameters")
        } else {
            console.log("Test1 failed. Did was created with incorrect parameters or was not created at all")
        }
    } catch(er) {
        console.log(er)
    }
}

async function test2() {
    console.log()
    console.log("Test2: activating did with pubkey")
    return new Promise(async (resolve, reject) => {
        try {
            await api.init(DocumentContract, await client.getAddress(), client.signer)
            await Timeout(5000)
            console.log()
            console.log("Test2 completed successfully")
            resolve(true)
        } catch {
            console.log("Test2 failed. It was not possible to activate the did. \nYou will not be able to perform further tests")
            reject(false)
        }
    })
}

async function test3() {
    try {
        console.log()
        console.log("Test3: changing didDocument parameters")
        didDocument.id = "did:change test:" + client.signer.keys.public
        didDocument.context[0] = "https://test/test/23/test"
        await api.newDidDocument(client, DocumentContract, JSON.stringify(didDocument))
        await api.newDidIssuerAddr(client, DocumentContract, await client2.getAddress())
        await Timeout(20000)
        console.log()
        console.log("Test3 completed successfully")
    } catch {
        console.log("Test3 failed. changing didDocument failed")
    }
    
}

async function statusDidDocument(didDocument) {
    if(didDocument.status == 0) {
        didDocument.status = "inactive"
    } else if(didDocument.status == 1) {
        didDocument.status = "active"
    }
    return new Promise((resolve, reject) => {
        resolve(didDocument)
    })
}

async function viewDidDocument(message) {
    ress = await api.getDid(DocumentContract)
    ress = await statusDidDocument(ress.value0)
    console.log(message)
    diddocument = JSON.parse(ress.didDocument)
    console.log({
        status: ress.status,
        PubKey: ress.PubKey,
        issuerAddr: ress.issuerAddr,
        didDocument: {
            "@context": diddocument.context,
            id: diddocument.id,
            authentication: diddocument.authentication[0]
        }
    })
}

async function createDidDocument() {
    didDocument.id = didDocument.id + client.signer.keys.public
    didDocument.authentication[0].controller = didDocument.authentication[0].controller + client.signer.keys.public
    didDocument.authentication[0].id = didDocument.authentication[0].id + client.signer.keys.public
}

async function Timeout(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time, undefined)
    })
}

async function deleteData() {
    try {
        await client.run("deleteContract")
        await api.deleteDidDocument(client2, DocumentContract)
    } catch (er) {
        console.error("Error: deleting resources failed")
        console.log(er)
    }
}

async function createDidDocumentContract() {
    return new Promise(async (resolve, reject) => {
        try {
            setTimeout(resolve, 20000, await send.createAccount(network, DidDocumentContract, signerNone(), 
            await api.resolveDidDocument(StorageContract, "0x" + client.signer.keys.public)))
        } catch {
            reject("Error: failed to create an instance of the DidDocument contract")
        }
    })
}

async function init() {
    try {
        console.log("Start of resource initialization")
        client = await deployClient()
        await createDidDocument()
        await main()
        await deleteData()
        
    } catch(er) {
        console.error(er)
    }
}

async function deployClient() {
    return new Promise(async (resolve, reject) => {
        try {
            contract = new Account(ClientContract, {
                signer: signerKeys(await network.crypto.generate_random_sign_keys()),
                client: network
            })
            ress =  await send.deploy(contract, {}, true)
            setTimeout(resolve, 10000, ress.Account)
        } catch(er) {
            reject("Error: No new account has been created!")
        }
    })
}

init()