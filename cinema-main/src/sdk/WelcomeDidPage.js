import React, {useState} from "react";
import {HashRouter as Router, Link, Redirect} from "react-router-dom";
import {ProviderRpcClient, RawProviderApiResponse} from "ton-inpage-provider";

import {Account} from "@tonclient/appkit";
import {libWeb} from "@tonclient/lib-web";
import {signerKeys, TonClient, signerNone} from "@tonclient/core";

// import {DidStorageContract} from "./contracts/DidStorageContract.js";
import {DEXClientContract} from "../extensions/contracts/testNet/DEXClientMainNet.js";
// import {DidDocumentContract} from "./contracts/DidDocumentContract.js";

import {DidStorageContract} from "./contracts/new/DidStorageContractDev.js";
import {DidDocumentContract} from "./contracts/new/DidDocumentContractDev.js";

import {useQuery} from "react-query";

import * as ed from "noble-ed25519";

import sha256 from "crypto-js/sha256";

//const {TonClient} = require("@tonclient/core");
TonClient.useBinaryLibrary(libWeb);
const client = new TonClient({network: {endpoints: ["main.ton.dev"]}});
// const client = new TonClient({network: {endpoints: ["net.ton.dev"]}});

const pidCrypt = require("pidcrypt");
require("pidcrypt/aes_cbc");

// net otn dev
// let dexrootAddr = "0:fc591b0d9200925aa7b4db8e6a8ab5515ef10818949b836c0e5b2ca26d558a35";

// main net
let dexrootAddr =
	"0:f8d58bde0f6b1fbc647f534a5a81e8b5fa8d3553ebe1ee96fd87285a20bf5ea6";

// const request = () =>
// 	fetch("http://ssi.defispace.com:4001/graphql", {
// 		method: "POST",
// 		headers: {"Content-Type": "application/json; charset=utf-8"},
// 		body: JSON.stringify({
// 			query:
// 				'mutation loginGenerate{loginGenerate(did:"978cae5ccb0048de4bf6c76ffba5c2686987fd72494137de8373a84e5f720063")}',
// 		}),
// 	}).then((response) => response.json());

// const request2 = (hex) =>
// 	fetch("http://ssi.defispace.com:4001/graphql", {
// 		method: "POST",
// 		headers: {"Content-Type": "application/json; charset=utf-8"},
// 		body: JSON.stringify({
// 			query:
// 				'mutation LoginVerify{loginVerify(did:"978cae5ccb0048de4bf6c76ffba5c2686987fd72494137de8373a84e5f7200rt",signatureHex:"' +
// 				hex +
// 				'")}',
// 		}),
// 	}).then((response) => response.json());

function WelcomeDidPage() {
	const [didDoc, setDidDoc] = useState();

	const seed = sessionStorage.seed;

	const [pubK, setPubK] = useState();

	const [loader, setLoader] = useState(false);

	const [DID, setDID] = useState();

	const [menuCurent, setMenuCurent] = useState(0);

	const attributes = [
		"id",
		"@context",
		"controller",
		"alsoKnownAs",
		"verificationMethod",
		"authentication",
		"assertionMethod",
		"keyAgreement",
		"capabilityInvocation",
		"capabilityDelegation",
		"service",
	];

	const [curentAttr, setCurentAttr] = useState();

	const [curentStatus, setCurentStatus] = useState();

	const [curentPub, setCurentPub] = useState();

	const [curentAddr, setCurentAddr] = useState();

	const [alertW, setAlertW] = useState({
		hidden: true,
		text: "",
		title: "",
	});

	async function getClientKeys(phrase) {
		//todo change with only pubkey returns
		let test = await client.crypto.mnemonic_derive_sign_keys({
			phrase,
			path: "m/44'/396'/0'/0/0",
			dictionary: 1,
			word_count: 12,
		});
		return test;
	}

	const [redirect, setRedirect] = useState(false);
	//setPubK((getClientKeys(seed)).public);

	// let res = request();

	// let generateResult;
	// res.then((response) => {
	// 	console.log(response);
	// 	generateResult = response.data.loginGenerate;

	// 	let res2 = request2(generateResult);

	// 	res2.then((response2) => {
	// 		console.log(response2);
	// 	});
	// });

	async function getClientBalance(clientAddress) {
		console.log("clientAddress", clientAddress);
		let address = clientAddress;
		if (
			clientAddress ===
			"0:0000000000000000000000000000000000000000000000000000000000000000"
		)
			return 0;
		try {
			let clientBalance = await client.net.query_collection({
				collection: "accounts",
				filter: {
					id: {
						eq: address,
					},
				},
				result: "balance",
			});
			console.log("clientBalance", clientBalance);
			return +clientBalance.result[0].balance / 1000000000;
		} catch (e) {
			console.log("catch E", e);
			return e;
		}
	}

	async function createDID3() {
		let bal = getClientBalance(localStorage.address);

		bal.then(async (data) => {
			if (data < 1) {
				alert("Insufficient balance");
				return;
			} else {
				setLoader(true);

				const acc = new Account(DEXClientContract, {
					address: localStorage.address,
					signer: signerKeys(await getClientKeys(sessionStorage.seed)),
					client,
				});

				let pubkey = (await getClientKeys(seed)).public;

				try {
					const newDIDDoc = {
						id: "did:everscale:" + pubkey.toString(),
						//createdAt: new Date().getTime().toString(),
						"@context": [
							"https://www.w3.org/ns/did/v1",
							"https://w3id.org/security/suites/ed25519-2020/v1",
						],
						publicKey: pubkey.toString(),
						verificationMethod: {
							id: "did:everscale:" + pubkey.toString(),
							type: "Ed25519VerificationKey2020",
							controller: "did:everscale:" + pubkey.toString(),
							publicKeyMultibase: pubkey,
						},
					};

					const {body} = await client.abi.encode_message_body({
						abi: {type: "Contract", value: DidStorageContract.abi},
						signer: {type: "None"},
						is_internal: true,
						call_set: {
							function_name: "addDid",
							input: {
								pubKey: "0x" + pubkey,
								didDocument: JSON.stringify(newDIDDoc),
								addr: localStorage.address,
							},
						},
					});

					const res = await acc.run("sendTransaction", {
						dest: dexrootAddr,
						value: 500000000,
						bounce: true,
						flags: 3,
						payload: body,
					});

					console.log(res);
				} catch (e) {
					console.log(e);
				}

				// try{
				// 	const acc2 = new Account(DidStorageContract, {
				// 		address: dexrootAddr,
				// 		signer: signerNone(),
				// 		client,
				// 	});
				// 	const res2 = await acc2.runLocal("resolveDidDocument", {
				// 		id: "0x" + pubkey,
				// 	});

				// 	console.log(res2);

				// 	let addrDidDoc = res2.decoded.out_messages[0].value.addrDidDocument;

				// 	const didAcc = new Account(DidDocumentContract, {
				// 		address: addrDidDoc,
				// 		signer: signerNone(),
				// 		client,
				// 	});

				// 	const resDid = await didAcc.runLocal("getDid", {});

				// 	//setDidDoc(resDid.decoded.out_messages[0].value.value0);
				// 	console.log(resDid.decoded.out_messages[0].value.value0);
				// } catch(e) {
				// 	console.log(e);
				// }

				setTimeout(async function () {
					const acc2 = new Account(DidStorageContract, {
						address: dexrootAddr,
						signer: signerNone(),
						client,
					});
					const res2 = await acc2.runLocal("resolveDidDocument", {
						id: "0x" + pubkey,
					});

					console.log(res2);

					let addrDidDoc = res2.decoded.out_messages[0].value.addrDidDocument;

					try {
						const accDid = new Account(DidDocumentContract, {
							address: addrDidDoc,
							signer: signerNone(),
							client,
						});

						const resInit = await accDid.run(
							"init",
							{
								issuerAddr: localStorage.address,
							},
							{
								signer: signerKeys(await getClientKeys(sessionStorage.seed)),
							},
						);

						console.log(resInit);
					} catch (e) {
						console.log(e);
						setLoader(false);
						alert("Error!");
						return;
					}

					const didAcc = new Account(DidDocumentContract, {
						address: addrDidDoc,
						signer: signerNone(),
						client,
					});

					const resDid = await didAcc.runLocal("getDid", {});

					//setDidDoc(resDid.decoded.out_messages[0].value.value0);
					console.log(resDid.decoded.out_messages[0].value.value0);

					let tempDoc = JSON.parse(
						resDid.decoded.out_messages[0].value.value0.didDocument,
					);

					let tempDid = tempDoc.id;

					console.log(tempDoc);

					console.log(tempDid);

					setLoader(false);
					setAlertW({
						hidden: false,
						text: "Your DID has been created: " + tempDid,
						title: "Congratulations",
					});
				}, 20000);
			}
		});
	}

	async function resolveDID() {
		let tempDid = DID.split(":")[2];
		console.log(DID);

		setLoader(true);

		const acc = new Account(DEXClientContract, {
			address: localStorage.address,
			signer: signerKeys(await getClientKeys(sessionStorage.seed)),
			client,
		});

		const acc2 = new Account(DidStorageContract, {
			address: dexrootAddr,
			signer: signerNone(),
			client,
		});

		let res2;

		try {
			res2 = await acc2.runLocal("resolveDidDocument", {
				id: "0x" + tempDid,
			});
		} catch {
			setLoader(false);
			alert("Incorrect format DID");
			return;
		}

		console.log(res2);

		let addrDidDoc = res2.decoded.out_messages[0].value.addrDidDocument;

		try {
			const didAcc = new Account(DidDocumentContract, {
				address: addrDidDoc,
				signer: signerNone(),
				client,
			});

			const resDid = await didAcc.runLocal("getDid", {});

			setLoader(false);
			setDidDoc(resDid.decoded.out_messages[0].value.value0);
			console.log(resDid.decoded.out_messages[0].value.value0);
		} catch (e) {
			console.log(e);
			setLoader(false);
			alert(
				"Error! \n Possible reasons: \n - Wrong DID \n - This DID has been deleted",
			);
		}
	}

	async function updateDIDDocument() {
		let tempDid = DID.split(":")[2];
		console.log(DID);

		setLoader(true);

		const acc = new Account(DEXClientContract, {
			address: localStorage.address,
			signer: signerKeys(await getClientKeys(sessionStorage.seed)),
			client,
		});

		let pubkey = (await getClientKeys(seed)).public;

		const acc2 = new Account(DidStorageContract, {
			address: dexrootAddr,
			signer: signerNone(),
			client,
		});

		const res2 = await acc2.runLocal("resolveDidDocument", {
			id: "0x" + tempDid,
		});

		console.log(res2);

		let addrDidDoc = res2.decoded.out_messages[0].value.addrDidDocument;

		const didAcc = new Account(DidDocumentContract, {
			address: addrDidDoc,
			signer: signerNone(),
			client,
		});

		console.log(JSON.stringify(didDoc.didDocument));

		try {
			const {body} = await client.abi.encode_message_body({
				abi: {type: "Contract", value: DidDocumentContract.abi},
				signer: {type: "None"},
				is_internal: true,
				call_set: {
					function_name: "newDidDocument",
					input: {
						didDocument: didDoc.didDocument,
					},
				},
			});

			const res = await acc.run("sendTransaction", {
				dest: addrDidDoc,
				value: 300000000,
				bounce: true,
				flags: 3,
				payload: body,
			});

			console.log(res);
		} catch (e) {
			console.log(e);
		}

		setTimeout(async function () {
			try {
				const resDid = await didAcc.runLocal("getDid", {});

				setDidDoc(resDid.decoded.out_messages[0].value.value0);
				console.log(resDid.decoded.out_messages[0].value.value0);
				setLoader(false);
			} catch (e) {
				console.log(e);
				alert("Error!");
				setLoader(false);
			}
		}, 20000);
	}

	function addAttribute() {
		console.log(curentAttr);
		Object.keys(JSON.parse(didDoc.didDocument)).map((item) => {
			if (item == curentAttr) {
				alert("This attribute already exist!");
				return;
			}
		});
		let tempDidDoc = {};
		console.log(didDoc);
		for (let key in didDoc) {
			let temp = didDoc[key];
			if (key == "didDocument") {
				let tempDoc = JSON.parse(temp);
				tempDoc[curentAttr] = "null";
				tempDidDoc[key] = JSON.stringify(tempDoc);
			} else {
				console.log(temp);
				tempDidDoc[key] = temp;
			}
		}
		console.log(tempDidDoc);
		setDidDoc(tempDidDoc);
	}

	function deleteAttribute(item) {
		console.log(item);

		let tempDidDoc = {};
		console.log(didDoc);
		for (let key in didDoc) {
			let temp = didDoc[key];
			if (key == "didDocument") {
				let tempDoc = JSON.parse(temp);
				delete tempDoc[item];
				tempDidDoc[key] = JSON.stringify(tempDoc);
			} else {
				console.log(temp);
				tempDidDoc[key] = temp;
			}
		}
		console.log(tempDidDoc);
		setDidDoc(tempDidDoc);
	}

	function saveAttribute(item, value) {
		let tempDidDoc = {};
		console.log(didDoc);
		for (let key in didDoc) {
			let temp = didDoc[key];
			if (key == "didDocument") {
				let tempDoc = JSON.parse(temp);
				tempDoc[item] = value;
				tempDidDoc[key] = JSON.stringify(tempDoc);
			} else {
				console.log(temp);
				tempDidDoc[key] = temp;
			}
		}
		console.log(tempDidDoc);
		setDidDoc(tempDidDoc);
	}

	async function updateDidStatus() {
		if (curentStatus == undefined) {
			alert("Set status");
			return;
		}

		let tempDid = DID.split(":")[2];
		console.log(DID);

		let bal = getClientBalance(localStorage.address);

		bal.then((data) => {
			if (data < 1) {
				alert("Insufficient balance");
				return;
			}
		});

		setLoader(true);

		const acc = new Account(DEXClientContract, {
			address: localStorage.address,
			signer: signerKeys(await getClientKeys(sessionStorage.seed)),
			client,
		});

		let pubkey = (await getClientKeys(seed)).public;

		const acc2 = new Account(DidStorageContract, {
			address: dexrootAddr,
			signer: signerNone(),
			client,
		});

		const res2 = await acc2.runLocal("resolveDidDocument", {
			id: "0x" + tempDid,
		});

		console.log(res2);

		let addrDidDoc = res2.decoded.out_messages[0].value.addrDidDocument;

		const didAcc = new Account(DidDocumentContract, {
			address: addrDidDoc,
			signer: signerNone(),
			client,
		});

		//console.log(JSON.stringify(didDoc.didDocument));

		try {
			const {body} = await client.abi.encode_message_body({
				abi: {type: "Contract", value: DidDocumentContract.abi},
				signer: {type: "None"},
				is_internal: true,
				call_set: {
					function_name: "newDidStatus",
					input: {
						status: Number(curentStatus),
					},
				},
			});

			const res = await acc.run("sendTransaction", {
				dest: addrDidDoc,
				value: 300000000,
				bounce: true,
				flags: 3,
				payload: body,
			});

			console.log(res);
		} catch (e) {
			console.log(e);
		}

		setTimeout(async function () {
			const resDid = await didAcc.runLocal("getDid", {});

			setDidDoc(resDid.decoded.out_messages[0].value.value0);
			console.log(resDid.decoded.out_messages[0].value.value0);
			setLoader(false);
		}, 20000);
	}

	async function updateDidPub() {
		if (curentPub == undefined) {
			alert("Set PubKey");
			return;
		}
		if (curentAddr == undefined) {
			alert("Set Address");
			return;
		}

		let tempDid = DID.split(":")[2];
		console.log(DID);

		console.log(curentPub, curentAddr);

		let bal = getClientBalance(localStorage.address);

		bal.then((data) => {
			if (data < 1) {
				alert("Insufficient balance");
				return;
			}
		});

		setLoader(true);

		const acc = new Account(DEXClientContract, {
			address: localStorage.address,
			signer: signerKeys(await getClientKeys(sessionStorage.seed)),
			client,
		});

		let pubkey = (await getClientKeys(seed)).public;

		const acc2 = new Account(DidStorageContract, {
			address: dexrootAddr,
			signer: signerNone(),
			client,
		});

		const res2 = await acc2.runLocal("resolveDidDocument", {
			id: "0x" + tempDid,
		});

		console.log(res2);

		let addrDidDoc = res2.decoded.out_messages[0].value.addrDidDocument;

		const didAcc = new Account(DidDocumentContract, {
			address: addrDidDoc,
			signer: signerNone(),
			client,
		});

		//console.log(JSON.stringify(didDoc.didDocument));

		try {
			const {body} = await client.abi.encode_message_body({
				abi: {type: "Contract", value: DidDocumentContract.abi},
				signer: {type: "None"},
				is_internal: true,
				call_set: {
					function_name: "newDidIssuerPubKey",
					input: {
						pubKey: "0x" + curentPub,
						issuerAddr: curentAddr,
					},
				},
			});

			const res = await acc.run("sendTransaction", {
				dest: addrDidDoc,
				value: 300000000,
				bounce: true,
				flags: 3,
				payload: body,
			});

			console.log(res);
		} catch (e) {
			console.log(e);
			setLoader(false);
			return;
		}

		setTimeout(async function () {
			try {
				const resDid = await didAcc.runLocal("getDid", {});

				setDidDoc(resDid.decoded.out_messages[0].value.value0);
				console.log(resDid.decoded.out_messages[0].value.value0);
				setLoader(false);
			} catch (e) {
				console.log(e);
				alert("Error!");
				setLoader(false);
			}
		}, 20000);
	}

	async function deleteDid() {
		let tempDid = DID.split(":")[2];
		console.log(DID);

		let bal = getClientBalance(localStorage.address);

		bal.then((data) => {
			if (data < 1) {
				alert("Insufficient balance");
				return;
			}
		});

		setLoader(true);

		const acc = new Account(DEXClientContract, {
			address: localStorage.address,
			signer: signerKeys(await getClientKeys(sessionStorage.seed)),
			client,
		});

		let pubkey = (await getClientKeys(seed)).public;

		const acc2 = new Account(DidStorageContract, {
			address: dexrootAddr,
			signer: signerNone(),
			client,
		});

		const res2 = await acc2.runLocal("resolveDidDocument", {
			id: "0x" + tempDid,
		});

		console.log(res2);

		let addrDidDoc = res2.decoded.out_messages[0].value.addrDidDocument;

		const didAcc = new Account(DidDocumentContract, {
			address: addrDidDoc,
			signer: signerNone(),
			client,
		});

		//console.log(JSON.stringify(didDoc.didDocument));

		try {
			const {body} = await client.abi.encode_message_body({
				abi: {type: "Contract", value: DidDocumentContract.abi},
				signer: {type: "None"},
				is_internal: true,
				call_set: {
					function_name: "deleteDidDocument",
					input: {},
				},
			});

			const res = await acc.run("sendTransaction", {
				dest: addrDidDoc,
				value: 300000000,
				bounce: true,
				flags: 3,
				payload: body,
			});

			console.log(res);
		} catch (e) {
			console.log(e);
			setLoader(false);
			return;
		}

		setTimeout(async function () {
			console.log(1);
			// const resDid = await didAcc.runLocal("getDid", {});

			// setDidDoc(resDid.decoded.out_messages[0].value.value0);
			// console.log(resDid.decoded.out_messages[0].value.value0);

			const res3 = await acc2.runLocal("resolveDidDocument", {
				id: "0x" + tempDid,
			});

			console.log(res3);

			try {
				const resDid = await didAcc.runLocal("getDid", {});

				setDidDoc(resDid.decoded.out_messages[0].value.value0);
				console.log(resDid.decoded.out_messages[0].value.value0);
			} catch (e) {
				backToLogin();
				setLoader(false);
				alert("Did doc delete");
			}

			setLoader(false);
		}, 20000);
	}

	function backToLogin() {
		setDidDoc("");
		setDID("");
	}

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
					testSign(data.user.token);
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
					if (data.user.token == undefined) {
						alert("Login Error!");
					} else {
						console.log(data.user.token);
						sessionStorage.setItem("token", data.user.token);
						sessionStorage.setItem("did", tempDid);
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

	// async function signMessage(input) {

	//     const msg = input.message
	//     const msgHash = crypto.createHash('sha256').update(msg).digest('hex');
	//     console.log(msgHash)

	//     return await ed.sign(msgHash, input.privateKey);
	// }

	return (
		<Router>
			<div className={alertW.hidden ? "hide" : "modal-w modal-welcome"}>
				<button
					className="close"
					onClick={() => setAlertW({hidden: true, text: "", title: ""})}
				>
					<span></span>
					<span></span>
				</button>

				<div class="text">{alertW.title}</div>

				<span class="content">{alertW.text}</span>
			</div>

			<div className={alertW.hidden ? "modal-w modal-welcome" : "hide"}>
				<div className={loader ? "lds-dual-ring" : "hide"}></div>
				<div className="text">Welcome!</div>

				{/* <button type="button" className="btn btn-secondary" onClick={DidCreate}>
					I want to create DID
				</button>
				<button type="button" className="btn btn-secondary" onClick={createDID}>
					I want to create DID2
				</button> */}

				<input
					type="text"
					placeholder="DID"
					onChange={(ev) => {
						setDID(ev.target.value);
					}}
				/>
				<button type="button" className="btn btn-secondary" onClick={testreq}>
					Log in with DID
				</button>

				{/* <button onClick={testreq}>test</button> */}
				{redirect ? <Redirect to="/app" /> : null}
			</div>
		</Router>
	);
}

export default WelcomeDidPage;
