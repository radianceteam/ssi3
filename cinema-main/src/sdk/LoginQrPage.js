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

const pidCrypt = require("pidcrypt");
require("pidcrypt/aes_cbc");

var QRCode = require("qrcode.react");

// net otn dev
let dexrootAddr =
	"0:fc591b0d9200925aa7b4db8e6a8ab5515ef10818949b836c0e5b2ca26d558a35";

// main net
// let dexrootAddr = "0:f8d58bde0f6b1fbc647f534a5a81e8b5fa8d3553ebe1ee96fd87285a20bf5ea6";

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

function LoginQrPage() {
	let abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
	let rs = "";
	while (rs.length < 25) {
		rs += abc[Math.floor(Math.random() * abc.length)];
	}
	console.log(rs);

	let url_qr =
		"https://wordpress.defispace.com/wp-content/plugins/login-ssi-qr-code-everscale/endpoint.php?token=" +
		rs +
		"&did=3152b85a7e12fed7be0eecdd11dd7bab7311b196a2d9e49ec5fdc10c17b748e4";

	function f() {
		const request = new XMLHttpRequest();

		const url =
			"https://wordpress.defispace.com/wp-content/plugins/login-ssi-qr-code-everscale/check_auth.php";

		const params = `token=${rs}`;

		request.open("POST", url, true);

		request.setRequestHeader(
			"Content-type",
			"application/x-www-form-urlencoded",
		);

		request.addEventListener("readystatechange", () => {
			if (request.readyState === 4 && request.status === 200) {
				if (request.responseText == "true") {
					setRedirect(true);
				} else {
					console.log(false);
				}
			}
		});

		request.send(params);

		setTimeout(f, 5000);
	}

	f();

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

				<span className="sub-text">
					Scan the QR code using a mobile device to log in (demo login with test
					user)
				</span>

				<QRCode value={url_qr} />

				{/* <button onClick={testreq}>test</button> */}
				{redirect ? <Redirect to="/app" /> : null}
			</div>
		</Router>
	);
}

export default LoginQrPage;
