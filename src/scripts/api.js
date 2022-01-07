const { Account } = require("@tonclient/appkit")
const { TonClient, signerKeys, signerNone } = require("@tonclient/core")
const { libNode } = require("@tonclient/lib-node")

const send = require("./sendMessage")

const {DidStorageContract} = require('../build/DidStorageContract')
const {DidDocumentContract} = require('../build/DidDocumentContract')



module.exports = {

    addDid: async (account, storageCotract, id, didDocument) => {
        return new Promise(async (resolve, reject) => {
            try {
                body = await send.buildPayload(storageCotract.abi, {
                    function_name: "addDid",
                    input: {
                        pubKey: id,
                        didDocument: didDocument
                    }
                }, true, signerNone())
                transaction = await send.sendTransaction(account, 
                    await storageCotract.getAddress(), 500000000, true, 0, body)
                addrDidDocument = await send.sendRunLocal(storageCotract, 
                    "resolveDidDocument", {id: id})
                resolve({transaction,
                    addrDidDocument: addrDidDocument.decoded.output.addrDidDocument})
            } catch(er) {
                reject(er)
            }
        })
    },

    resolveDidDocument: async (storageContract, id) => {
        return new Promise(async (resolve, reject) => {
            try {
                transaction = await send.sendRunLocal(storageContract, "resolveDidDocument",
                {
                    id: id
                })
                resolve(transaction.decoded.output.addrDidDocument)
            } catch(er) {
                reject(er)
            }
        })
    },

    resolveCodeHashDidDocument: async (storageContract) => {
        return new Promise(async (resolve, reject) => {
            try {
                transaction = await send.sendRunLocal(storageContract, "resolveCodeHashDidDocument")
                resolve(transaction.decoded.output.codeHashDidDocument)
            } catch(er) {
                reject(er)
            }

        })
    }, 

    newDidDocument: async (account, DidDocumentContract, didDocument) => {
        return new Promise(async (resolve, reject) => {
            try {
                body = await send.buildPayload(DidDocumentContract.abi, {
                    function_name: "newDidDocument",
                    input: {
                        didDocument: didDocument
                    }
                }, true, signerNone())
                transaction = await send.sendTransaction(account,
                    await DidDocumentContract.getAddress(),
                    300000000, true, 0, body)
                resolve(transaction)
            } catch(er) {
                reject(er)
            }
        })
    },

    newDidIssuerAddr: async (account, DidDocumentContract, issuerAddr) => {
        return new Promise(async (resolve, reject) => {
            try {
                body = await send.buildPayload(DidDocumentContract.abi, {
                    function_name: "newDidIssuerAddr",
                    input: {
                        issuerAddr: issuerAddr
                    }
                }, true, signerNone())
                transaction = await send.sendTransaction(account, 
                    await DidDocumentContract.getAddress(),
                    300000000, true, 0, body)
                resolve(transaction)
            } catch(er) {
                reject(er)
            }
        })
    },

    newDidStatus : async (account, DidDocumentContract, status) => {
        return new Promise(async (resolve, reject) => {
            try {
                body = await send.buildPayload(DidDocumentContract.abi, {
                    function_name: "newDidStatus",
                    input: {
                        status: status
                    }
                }, true, signerNone())
                transaction = await send.sendTransaction(account, 
                    await DidDocumentContract.getAddress(),
                    300000000, true, 0, body)
                resolve(transaction)
            } catch(er) {
                reject(er)
            }
        })
    },

    deleteDidDocument: async (account, DidDocumentContract) => {
        return new Promise(async (resolve, reject) => {
            try {
                body = await send.buildPayload(DidDocumentContract.abi, {
                    function_name: "deleteDidDocument",
                    input: {
    
                    }
                }, true, signerNone())
                transaction = await send.sendTransaction(account, 
                    await DidDocumentContract.getAddress(),
                    100000000, true, 0, body)
                resolve(transaction)
            } catch (er) {
                reject(er)
            }
        })
    },

    getDid: async (DidDocumentContract) => {
        return new Promise(async (resolve, reject) => {
            try {
                transaction = await send.sendRunLocal(DidDocumentContract, "getDid")
                resolve(transaction.decoded.output)
            } catch(er) {
                reject(er)
            }
        })
    },

    getInfo: async (DidDocumentContract) => {
        return new Promise(async (resolve, reject) => {
            try {
                transaction = await send.sendRunLocal(DidDocumentContract, "getInfo")
                resolve(transaction.decoded.output)
            } catch(er) {
                reject(er)
            }
        })
    },

    init: async (DidDocumentContract, issuerAddr, signer) => {
        return new Promise(async (resolve, reject) => {
            try {
                transaction = await DidDocumentContract.run("init", {
                    issuerAddr: issuerAddr
                }, {
                    signer: signer
                })
                resolve(transaction)
            } catch(er) {
                reject(er)
            }
        })
    }


}