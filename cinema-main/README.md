## Description

Frontend of integration example with DID authentication (include demo QR Code authentication)
There is a demo web application (Frontend) that shows DID integration. The site implements authentication using DID.

## Available Scripts

In the project directory, you can run:

### `npm install`

Runs this command to install all project dependencies

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3005](http://localhost:3005) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Video help

This video shows the entire user interface [video](https://www.youtube.com/watch?v=EkQcbf4sxE4)

## Authentication Requests

### DEX Client Requests

### First Request

DID is transferred to the request body, at the output we get the signature

```
fetch("https://ssi.defispace.com/auth", {
			method: "post",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				Connection: "keep-alive",
			},

			body: `{"user":{"did": "${tempDid}"}}`,
		})
			.then((response) => {
				return response.json();
			})
			.then(async function (data) {
				// data is the parsed version of the JSON returned from the above endpoint.
				let msg = data.value;
				//const msgHash = crypto.createHash('sha256').update(msg).digest('hex');
				const msgHash = sha256(msg).toString();
				console.log(msgHash);

				let privatemsg = (await getClientKeys(seed)).secret;

				console.log(privatemsg);

				return await ed.sign(msgHash, privatemsg);
			})
			.then((data) => {
				sendSign(data);
			});
```

### Second Request

A signature and a did are passed to the request body, and at the output we get a special token

```
function sendSign(data) {
			fetch("https://ssi.defispace.com/auth/login", {
				method: "post",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					Connection: "keep-alive",
				},

				body: `{
					"user":
					{
						"signatureHex":"${data}",
						"did": "${tempDid}"
				}
				}`,
			})
				.then((data) => {
					return data.json();
				})
				.then((data) => {
					testSign(data.token);
				});
		}
```

### Third Request

Add a special token to the request header, if the entry is successful, then the request will return the same token, if the entry is unsuccessful, then the request will return an error

```
function testSign(data) {
			fetch("https://ssi.defispace.com/auth/user", {
				method: "get",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					Connection: "keep-alive",
					Authorization: `Token ${data}`,
				},
			})
				.then((data) => {
					return data.json();
				})
				.then((data) => {
					if (data.token == undefined) {
						alert("Login Error!");
					} else {
						console.log(data.token);
						setRedirect(true);
					}
				});
		}
```

### Full function with requests

```
function testreq() {
		let tempDid = DID.split(":")[2];
		console.log(DID);

		function sendSign(data) {
			fetch("https://ssi.defispace.com/auth/login", {
				method: "post",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					Connection: "keep-alive",
				},

				body: `{
					"user":
					{
						"signatureHex":"${data}",
						"did": "${tempDid}"
				}
				}`,
			})
				.then((data) => {
					return data.json();
				})
				.then((data) => {
					testSign(data.token);
				});
		}

		function testSign(data) {
			fetch("https://ssi.defispace.com/auth/user", {
				method: "get",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					Connection: "keep-alive",
					Authorization: `Token ${data}`,
				},
			})
				.then((data) => {
					return data.json();
				})
				.then((data) => {
					if (data.token == undefined) {
						alert("Login Error!");
					} else {
						console.log(data.token);
						setRedirect(true);
					}
				});
		}

		fetch("https://ssi.defispace.com/auth", {
			method: "post",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				Connection: "keep-alive",
			},

			body: `{"user":{"did": "${tempDid}"}}`,
		})
			.then((response) => {
				return response.json();
			})
			.then(async function (data) {
				// data is the parsed version of the JSON returned from the above endpoint.
				let msg = data.value;
				//const msgHash = crypto.createHash('sha256').update(msg).digest('hex');
				const msgHash = sha256(msg).toString();
				console.log(msgHash);

				let privatemsg = (await getClientKeys(seed)).secret;

				console.log(privatemsg);

				return await ed.sign(msgHash, privatemsg);
			})
			.then((data) => {
				sendSign(data);
			});
	}
```

### Ever Wallet Requests

The same requests for the ever wallet

### First Request

```
fetch("https://ssi.defispace.com/auth", {
			method: "post",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				Connection: "keep-alive",
			},

			body: `{"user":{"did": "${tempDid}"}}`,
		})
			.then((response) => {
				return response.json();
			})
			.then(async function (data) {
				// data is the parsed version of the JSON returned from the above endpoint.
				let msg = data.value;
				console.log(msg);
				//const msgHash = crypto.createHash('sha256').update(msg).digest('hex');
				//const msgHash = sha256(msg).toString(16);

				const msgHash = window.btoa(msg);
				console.log(msgHash);

				//let privatemsg = (await getClientKeys(seed)).secret;

				let signData = await ton.rawApi.signData({
					data: msgHash,
					publicKey: accountInteraction.publicKey,
				});

				console.log(signData);

				return signData.signatureHex;
			})
			.then((data) => {
				sendSign(data);
				console.log(data);
			});
```

### Second Request

```
function sendSign(data) {
			fetch("https://ssi.defispace.com/auth/login", {
				method: "post",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					Connection: "keep-alive",
				},

				body: `{
					"user":
					{
						"signatureHex":"${data}",
						"did": "${tempDid}"
				}
				}`,
			})
				.then((data) => {
					return data.json();
				})
				.then((data) => {
					testSign(data.token);
				});
		}
```

### Third Request

```
function testSign(data) {
			fetch("https://ssi.defispace.com/auth/user", {
				method: "get",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					Connection: "keep-alive",
					Authorization: `Token ${data}`,
				},
			})
				.then((data) => {
					return data.json();
				})
				.then(
					(data) => {
						console.log(data);
						if (data.token == undefined) {
							alert("Error Log In");
							return;
						} else {
							console.log(data.token);
							setRedirect(true);
						}
					},
					(error) => {
						console.log(error);
					},
				);
		}
```

### Full function with requests

```
async function testreq() {
		let tempDid = DID.split(":")[2];
		console.log(DID);

		console.log("initInpageProvider...");

		const provider = await import("ton-inpage-provider");
		if (!(await provider.hasTonProvider())) {
			throw new Error("Extension is not installed");
		}

		await ton.ensureInitialized();

		const {accountInteraction} = await ton.rawApi.requestPermissions({
			permissions: ["tonClient", "accountInteraction"],
		});

		console.log(accountInteraction);

		if (accountInteraction == null) {
			throw new Error("Insufficient permissions");
		}

		function sendSign(data) {
			fetch("https://ssi.defispace.com/auth/login", {
				method: "post",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					Connection: "keep-alive",
				},

				body: `{
					"user":
					{
						"signatureHex":"${data}",
						"did": "${tempDid}"
				}
				}`,
			})
				.then((data) => {
					return data.json();
				})
				.then((data) => {
					testSign(data.token);
				});
		}

		function testSign(data) {
			fetch("https://ssi.defispace.com/auth/user", {
				method: "get",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					Connection: "keep-alive",
					Authorization: `Token ${data}`,
				},
			})
				.then((data) => {
					return data.json();
				})
				.then(
					(data) => {
						console.log(data);
						if (data.token == undefined) {
							alert("Error Log In");
							return;
						} else {
							console.log(data.token);
							setRedirect(true);
						}
					},
					(error) => {
						console.log(error);
					},
				);
		}

		fetch("https://ssi.defispace.com/auth", {
			method: "post",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				Connection: "keep-alive",
			},

			body: `{"user":{"did": "${tempDid}"}}`,
		})
			.then((response) => {
				return response.json();
			})
			.then(async function (data) {
				// data is the parsed version of the JSON returned from the above endpoint.
				let msg = data.value;
				console.log(msg);
				//const msgHash = crypto.createHash('sha256').update(msg).digest('hex');
				//const msgHash = sha256(msg).toString(16);

				const msgHash = window.btoa(msg);
				console.log(msgHash);

				//let privatemsg = (await getClientKeys(seed)).secret;

				let signData = await ton.rawApi.signData({
					data: msgHash,
					publicKey: accountInteraction.publicKey,
				});

				console.log(signData);

				return signData.signatureHex;
			})
			.then((data) => {
				sendSign(data);
				console.log(data);
			});
	}
```
