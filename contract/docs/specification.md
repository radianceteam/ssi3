# DIDStorage

**Path**: [src/contracts/DidStorage.sol](../src/contracts/DidStorage.sol)

**Title**: DIDStorage contract


**Details**: Deploys and resolver DID document.

## constructor


### Params
|Index|Name           |Type      |Description              |
|-----|---------------|----------|-------------------------|
|0    |codeDidDocument|cell      |contract code DIDDocument|



## addDid

**Details**: deploy new DID document


### Params
|Index|Name       |Type   |Description           |
|-----|-----------|-------|----------------------|
|0    |pubKey     |uint256|public key DID subject|
|1    |didDocument|string |writable DVD document |



### Returns
|Index|Name  |Type   |Description           |
|-----|------|-------|----------------------|
|0    |value0|uint256|public key DID subject|



## signData

**Details**: signs a line with a secret key


### Params
|Index|Name|Type  |Description|
|-----|----|------|-----------|
|0    |data|string|signed line|



### Returns
|Index|Name  |Type   |Description       |
|-----|------|-------|------------------|
|0    |value0|uint256|signed information|



## verifySignature

**Details**: checks signed data


### Params
|Index|Name     |Type   |Description|
|-----|---------|-------|-----------|
|0    |data     |string |data string|
|1    |signature|uint256|signed data|



### Returns
|Index|Name  |Type|Description        |
|-----|------|----|-------------------|
|0    |value0|bool|verification result|



## resolveCodeHashDidDocument

**Details**: returns the hash of the DIDDocument contract

### Returns
|Index|Name               |Type   |Description|
|-----|-------------------|-------|-----------|
|0    |codeHashDidDocument|uint256|hash code  |



## resolveDidDocument

**Details**: returns the address of the DIDDocument contract

### Params
|Index|Name|Type   |Description           |
|-----|----|-------|----------------------|
|0    |id  |uint256|public key DID subject|

### Returns
|Index|Name           |Type   |Description                 |
|-----|---------------|-------|----------------------------|
|0    |addrDidDocument|address|address contract DIDDocument|



# DIDDocument

**Path**: [src/contracts/DidDocument.sol](../src/contracts/DidDocument.sol)

**Title**: contract for storing DID document

**Details**: the contract provides basic CRUD functions for managing the DID document


## constructor

**Details**: can only be deployed using the addDid function from the DIDStorage contract

### Params
|Index|Name       |Type   |Description           |
|-----|-----------|-------|----------------------|
|0    |pubKey     |uint256|public key DID subject|
|1    |didDocument|string |writable DID document |


## init

**Details**: initializes and activates DID document using the DID subject public key

### Params
|Index|Name      |Type   |Description                    |
|-----|----------|-------|-------------------------------|
|0    |issuerAddr|address|controller address for this DID|


## newDidDocument

**Details**: updates the DID document by overwriting it

### Params
|Index|Name       |Type  |Description     |
|-----|-----------|------|----------------|
|0    |didDocument|string|new DID document|


## newDidStatus

**Details**: updates the status of DID, 0-deactivated, 1-activated

### Params
|Index|Name  |Type |Description|
|-----|------|-----|-----------|
|0    |status|uint8|new status |


## newDidIssuerAddr

**Details**: updates the address of the DID controller

### Params
|Index|Name      |Type   |Description           |
|-----|----------|-------|----------------------|
|0    |issuerAddr|address|new controller address|



## deleteDidDocument

**Details**: deletes DID document and DIDDocument contract


## getDid

**Details**: returns DID Document, status, public key DID subject and address controller


### Returns
|Index|Name  |Type   |Description                    |
|-----|------|-------|-------------------------------|
|0    |value0|DIDItem|DID document and its parameters|


## getInfo

**Details**: Returns DID document and contract address DIDStorage

### Returns
|Index|Name          |Type   |Description                    |
|-----|--------------|-------|-------------------------------|
|0    |addrDidStorage|address|contract address DIDStorage    |
|1    |didItem       |DIDItem|DID document and its parameters|


## Components

### DIDItem
|Index|Name       |Type   |Description           |
|0    |status     |uint8  |DID document status   |
|1    |PubKey     |uint256|DID subject public key|
|2    |issuerAddr |address|controller address    |
|3    |didDocument|string |DID document          |







