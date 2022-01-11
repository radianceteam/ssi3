# DIDStorage
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



## resolveCodeHashDidDocument\

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








