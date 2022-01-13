## DID-SDK

This SDK aims to help the development of integrations with DidStorage smart-contracts that use JavaScript.

### Contents

- [`src/did-client-core.js`](./src/did-client-core.js) - sdk uses TonClient(<a href="https://github.com/tonlabs/ton-client-js">@tonclient/core</a>) for node js and web front
- [`src/did-wallet-extension.js`](./src/did-wallet-extension.js) - sdk uses EverWalletExtension(<a href="https://github.com/broxus/ton-inpage-provider">ton-inpage-provider</a>)

### Example use did-core for Node js

[Specification](./docs/spec-did-core.md)

```javascript

const { TonClient } = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");

TonClient.useBinaryLibrary(libNode);

const client = new TonClient({network: {endpoints: ["net.ton.dev"]}});

const core = require('../src/did-client-core.js');


async function main() {

  core.initSettings("devNet", client);
  
  const did = 'did:everscale:28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766';
  
  res = await core.resolveDIDDocument(did);

  console.log(res);
}
```

### Example use did-core for Web

[Specification](./docs/spec-did-core.md)

```javascript
import {TonClient} from "@tonclient/core";

import {libWeb} from "@tonclient/lib-web";
TonClient.useBinaryLibrary(libWeb);

const client = new TonClient({network: {endpoints: ["net.ton.dev"]}});

import core from '../src/did-client-core.js';

async function main() {

  core.initSettings("devNet", client);
  
  const did = 'did:everscale:28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766';
  
  res = await core.resolveDIDDocument(did);

  console.log(res);
}
```

### Example use did-core for Node js or Web
[Check file](./test/run.js)

### Example use did-extension for Web

[Specification](./docs/spec-did-extension.md)

```javascript

import core from '../src/did-wallet-extension.js';

async function main() {

  const accountInteraction = await core.initSettings("devNet");
  
  const did = 'did:everscale:28ba63cce65283cbccb368fea5ce49bc998cac156334dff20ad1ba262b2d0766';
  
  res = await core.resolveDIDDocument(did);

  console.log(res);
}
```

### How to install

```shell
git clone
npm install
```

### How to test

```shell
npm run test
```

Output
```

tests are completed
Result of tests
start tests: success
Test 1 - Create did smart-contract: success
Test 2 - resolve did: success
Test 3 - update json did document: success
Test 4 - update status of did document smart-contract: success
Test 5 - update Issuer Address of did document smart-contract: success
Test 6 - delete did document smart-contract: success
Test 7 - sign data: success
Test 8 - verify signature: success

```