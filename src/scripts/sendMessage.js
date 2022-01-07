const { Account } = require("@tonclient/appkit");
const { signerKeys, TonClient, signerNone } = require("@tonclient/core");

module.exports = {

    sendTransaction: async (account, dest, value, bounce, flags, payload, signer = signerNone()) => {
        return new Promise(async (resolve, reject) => {
            try {
                var ress = await account.run("sendTransaction", {
                    dest: dest,
                    value: value,
                    bounce: bounce,
                    flags: flags,
                    payload: payload
                })
                resolve(ress)
            } catch(er) {
                reject(er)
            }
        });
    },

    sendRunLocal: async (account, nameFunction, input) => {
        return new Promise(async (resolve, reject) => {
            try {
                var ress = await account.runLocal(nameFunction, input)
                resolve(ress)
            } catch(er) {
                reject(er)
            }
        })
    },

    buildPayload: async (abi, call_set, is_internal, signer) => {
        return new Promise(async (resolve, reject) => {
            try {
                var { body } = (await TonClient.default.abi.encode_message_body({
                    abi: abi,
                    call_set: call_set,
                    is_internal: is_internal,
                    signer: signer
                }))
                resolve(body)
            } catch (er) {
                reject(er)
            }
        })
    },

    deploy: async (imageContract, input, giver = false) => {
        return new Promise(async(resolve, reject) => {
            try {
                ress = await imageContract.deploy({initFunctionName:"constructor",  initInput: input,
                useGiver: giver})
                resolve({
                    transaction: ress,
                    Account: imageContract
                })
            } catch(er) {
                reject(er)
            }
        })
    },

    createAccount: async (client, contract, signer, address) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Account(contract, {
                    address: address,
                    signer: signer,
                    client: client
                }))
            } catch (er) {
                reject(er)
            }
        })
    }



}