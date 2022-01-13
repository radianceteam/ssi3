## did-client-core.js

---
### initSettings(network, client)

initialize settings for sdk

    network<string> - "devNet" for net.ton.dev or "mainNet" for main.ton.dev (see config/config.json)
    client<TonClient> - client for basic operations with smart-contracts ("@tonclient/core")

---
### createNewDidDocumentJson(pubKey)

create default didDocument json object

    pubKey<string> - public key of pair keys is id of didDocument

`return<object> json did Document`

    {
        id: "did:everscale:28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766",
        "@context": [
            "https://www.w3.org/ns/did/v1",
            "https://w3id.org/security/suites/ed25519-2020/v1",
        ],
        publicKey: "28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766",
        verificationMethod: {
            id: "did:everscale:28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766",
            type: "Ed25519VerificationKey2020",
            controller: "did:everscale:28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766",
            publicKeyMultibase: "28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766",
        },
    }

---

### createDID(accWallet, pubKey, addressIssuer, clientKeys, didDocument)

Create and init new Did smart-contract for public key in DidStorage (everscale)

    accWallet<Account> - Account ("@tonclient/appkit") of wallet for send transactions
    pubKey<string> - public key of pair keys is id of didDocument smart-contract
    addressIssuer<string> - address of contract is owner of didDocument smart-contract
    clientKeys<object> - pair of keys
        {
            "public":"28b...766",
            "secret":"e13..7440e"
        }
    didDocument<object> - json did Document
        {
            id: "did:everscale:28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766",
            "@context": [
                "https://www.w3.org/ns/did/v1",
                "https://w3id.org/security/suites/ed25519-2020/v1",
            ],
            publicKey: "28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766",
            verificationMethod: {
                id: "did:everscale:28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766",
                type: "Ed25519VerificationKey2020",
                controller: "did:everscale:28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766",
                publicKeyMultibase: "28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766",
            },
        }


`return<bool> status of operation`

---
### createDIDDefault(accWallet, pubKey, addressIssuer, clientKeys)

Create and init new DidDocument smart-contract for public key in DidStorage (everscale) with Default Json DidDocument (use createNewDidDocumentJson)
    
    same params for createDID

`return<bool> status of operation`

---

### getDidDocumentAddress(didMethod)

get address of DidDocument smart-contract from didStorage

    didMethod<string> - equals pubkey and id of DidDocument smart-contract

`return<address> address of DidDocument smart-contract`

---

### getDidFromMethod(pubKey)

get did from public key

    pubKey<string> - public key of pair keys is id of didDocument

`return<string> did`

    "did:everscale:28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766"

---

### resolveDIDDocument(did)

get didDocument json object from didStorage
    
    did<string> - "did:everscale:28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766"

`return<object> didDocument json object`

    {
        id: "did:everscale:28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766",
        "@context": [
            "https://www.w3.org/ns/did/v1",
            "https://w3id.org/security/suites/ed25519-2020/v1",
        ],
        publicKey: "28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766",
        verificationMethod: {
            id: "did:everscale:28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766",
            type: "Ed25519VerificationKey2020",
            controller: "did:everscale:28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766",
            publicKeyMultibase: "28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766",
        },
    }

---

### updateDIDDocument(accWallet, addressDidDoc, newDidDocument)

change json didDocument in DidDocument smart-contract of DidStorage

    accWallet<Account> - Account ("@tonclient/appkit") of wallet is owner of didDocument smart-contract (issuerAddr in smart-contract)
    addressDidDoc<address> - address of didDocument smart-contract (use getDidDocumentAddress)
    newDidDocument<object> - json object of DidDocument
        {
            id: "did:everscale:28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766",
            "@context": [
                "https://www.w3.org/ns/did/v1",
                "https://w3id.org/security/suites/ed25519-2020/v1",
            ],
            publicKey: "28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766",
            verificationMethod: {
                id: "did:everscale:28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766",
                type: "Ed25519VerificationKey2020",
                controller: "did:everscale:28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766",
                publicKeyMultibase: "28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766",
            },
        }

`return<bool> status of operation`

---

### updateDidStatus(accWallet, addressDidDoc, newStatus)

change status in DidDocument smart-contract of DidStorage

    accWallet<Account> - Account ("@tonclient/appkit") of wallet is owner of didDocument smart-contract (issuerAddr in smart-contract)
    addressDidDoc<address> - address of didDocument smart-contract (use getDidDocumentAddress)
    newStatus<int> - 0 or 1 (0 = inactive, 1 = active)

`return<bool> status of operation`

---

### updateDidIssuerAddress(accWallet, addressDidDoc, newDidIssuerAddress)

change owner (issuerAddr) in DidDocument smart-contract of DidStorage

    accWallet<Account> - Account ("@tonclient/appkit") of wallet is owner of didDocument smart-contract (issuerAddr in smart-contract)
    addressDidDoc<address> - address of didDocument smart-contract (use getDidDocumentAddress)
    newDidIssuerAddress<address> - new owner of didDocument smart-contract (issuerAddr in smart-contract)

`return<bool> status of operation`

---

### deleteDidDocument(accWallet, addressDidDoc)

delete DidDocument smart-contract of DidStorage

    accWallet<Account> - Account ("@tonclient/appkit") of wallet is owner of didDocument smart-contract (issuerAddr in smart-contract)
    addressDidDoc<address> - address of didDocument smart-contract (use getDidDocumentAddress)

`return<bool> status of operation`

---

### signData(msg, secretKey)

sign msg with secret key

    msg<string> - message that need sign
    secretKey<string> - secret key of pair keys

`return<string> hex signature`

---

### verifyMessage(signatureHex, msg, publicKey)

check signature

    signatureHex<string> - hex signature (use signData)
    msg<string> - message that need sign
    publicKey<string> - public key of pair keys

`return<bool> is valid signature or not`
