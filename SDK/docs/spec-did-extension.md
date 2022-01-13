## did-wallet-extension.js

---
### initSettings(network)

initialize settings for sdk

    network<string> - "devNet" for net.ton.dev or "mainNet" for main.ton.dev (see config/config.json)

`return<accountInteraction> see` <a href="https://github.com/broxus/ton-inpage-provider">ton-inpage-provider</a>

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

### createDID(didDocument)

Create and init new Did smart-contract for extension public key in DidStorage (everscale)

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
### createDIDDefault()

Create and init new DidDocument smart-contract for extension public key in DidStorage (everscale) with Default Json DidDocument (use createNewDidDocumentJson)
    
    -

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

### updateDIDDocument(addressDidDoc, newDidDocument)

change json didDocument in DidDocument smart-contract of DidStorage

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

### updateDidStatus(addressDidDoc, newStatus)

change status in DidDocument smart-contract of DidStorage

    addressDidDoc<address> - address of didDocument smart-contract (use getDidDocumentAddress)
    newStatus<int> - 0 or 1 (0 = inactive, 1 = active)

`return<bool> status of operation`

---

### updateDidIssuerAddress(addressDidDoc, newDidIssuerAddress)

change owner (issuerAddr) in DidDocument smart-contract of DidStorage

    addressDidDoc<address> - address of didDocument smart-contract (use getDidDocumentAddress)
    newDidIssuerAddress<address> - new owner of didDocument smart-contract (issuerAddr in smart-contract)

`return<bool> status of operation`

---

### deleteDidDocument(addressDidDoc)

delete DidDocument smart-contract of DidStorage

    accWallet<Account> - Account ("@tonclient/appkit") of wallet is owner of didDocument smart-contract (issuerAddr in smart-contract)
    addressDidDoc<address> - address of didDocument smart-contract (use getDidDocumentAddress)

`return<bool> status of operation`

---

### signData(msg)

sign msg with extension secret key

    msg<string> - message that need sign

`return<string> hex signature`

---

### verifyMessage(signatureHex, msg)

check signature

    signatureHex<string> - hex signature (use signData)
    msg<string> - message that need sign

`return<bool> is valid signature or not`
