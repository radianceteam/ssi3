module.exports = {
	DEXPairContract: {
		abi: {
			"ABI version": 2,
			header: ["pubkey", "time", "expire"],
			functions: [
				{
					name: "constructor",
					inputs: [
						{name: "souintA", type: "uint256"},
						{name: "souintB", type: "uint256"},
						{name: "gramsDeployConnector", type: "uint128"},
						{name: "gramsDeployWallet", type: "uint128"},
					],
					outputs: [],
				},
				{
					name: "getConnectorAddress",
					inputs: [
						{name: "_answer_id", type: "uint32"},
						{name: "connectorSoArg", type: "uint256"},
					],
					outputs: [{name: "value0", type: "address"}],
				},
				{
					name: "connectCallback",
					inputs: [{name: "wallet", type: "address"}],
					outputs: [],
				},
				{name: "connect", inputs: [], outputs: []},
				{
					name: "tokensReceivedCallback",
					inputs: [
						{name: "token_wallet", type: "address"},
						{name: "token_root", type: "address"},
						{name: "amount", type: "uint128"},
						{name: "sender_public_key", type: "uint256"},
						{name: "sender_address", type: "address"},
						{name: "sender_wallet", type: "address"},
						{name: "original_gas_to", type: "address"},
						{name: "updated_balance", type: "uint128"},
						{name: "payload", type: "cell"},
					],
					outputs: [],
				},
				{
					name: "burnCallback",
					inputs: [
						{name: "tokens", type: "uint128"},
						{name: "payload", type: "cell"},
						{name: "sender_public_key", type: "uint256"},
						{name: "sender_address", type: "address"},
						{name: "wallet_address", type: "address"},
						{name: "send_gas_to", type: "address"},
					],
					outputs: [],
				},
				{
					name: "getCallback",
					inputs: [{name: "id", type: "uint256"}],
					outputs: [
						{name: "token_wallet", type: "address"},
						{name: "token_root", type: "address"},
						{name: "amount", type: "uint128"},
						{name: "sender_public_key", type: "uint256"},
						{name: "sender_address", type: "address"},
						{name: "sender_wallet", type: "address"},
						{name: "original_gas_to", type: "address"},
						{name: "updated_balance", type: "uint128"},
						{name: "payload_arg0", type: "uint8"},
						{name: "payload_arg1", type: "address"},
						{name: "payload_arg2", type: "address"},
						{name: "payload_arg3", type: "uint128"},
						{name: "payload_arg4", type: "uint128"},
					],
				},
				{
					name: "getBalance",
					inputs: [{name: "_answer_id", type: "uint32"}],
					outputs: [{name: "value0", type: "uint128"}],
				},
				{
					name: "rootDEX",
					inputs: [],
					outputs: [{name: "rootDEX", type: "address"}],
				},
				{
					name: "soUINT",
					inputs: [],
					outputs: [{name: "soUINT", type: "uint256"}],
				},
				{
					name: "creator",
					inputs: [],
					outputs: [{name: "creator", type: "address"}],
				},
				{
					name: "codeDEXConnector",
					inputs: [],
					outputs: [{name: "codeDEXConnector", type: "cell"}],
				},
				{
					name: "rootA",
					inputs: [],
					outputs: [{name: "rootA", type: "address"}],
				},
				{
					name: "rootB",
					inputs: [],
					outputs: [{name: "rootB", type: "address"}],
				},
				{
					name: "rootAB",
					inputs: [],
					outputs: [{name: "rootAB", type: "address"}],
				},
				{
					name: "walletReserve",
					inputs: [],
					outputs: [{name: "walletReserve", type: "map(address,address)"}],
				},
				{
					name: "syncStatus",
					inputs: [],
					outputs: [{name: "syncStatus", type: "map(address,bool)"}],
				},
				{
					name: "balanceReserve",
					inputs: [],
					outputs: [{name: "balanceReserve", type: "map(address,uint128)"}],
				},
				{
					name: "totalSupply",
					inputs: [],
					outputs: [{name: "totalSupply", type: "uint128"}],
				},
				{
					name: "processingStatus",
					inputs: [],
					outputs: [
						{name: "processingStatus", type: "map(address,map(address,bool))"},
					],
				},
				{
					name: "processingData",
					inputs: [],
					outputs: [
						{name: "processingData", type: "map(address,map(address,uint128))"},
					],
				},
				{
					name: "processingDest",
					inputs: [],
					outputs: [
						{name: "processingDest", type: "map(address,map(address,address))"},
					],
				},
				{
					name: "rootConnector",
					inputs: [],
					outputs: [{name: "rootConnector", type: "map(address,address)"}],
				},
				{
					name: "connectors",
					inputs: [],
					outputs: [
						{
							components: [
								{name: "root_address", type: "address"},
								{name: "souint", type: "uint256"},
								{name: "status", type: "bool"},
							],
							name: "connectors",
							type: "map(address,tuple)",
						},
					],
				},
				{
					name: "counterCallback",
					inputs: [],
					outputs: [{name: "counterCallback", type: "uint256"}],
				},
				{
					name: "callbacks",
					inputs: [],
					outputs: [
						{
							components: [
								{name: "token_wallet", type: "address"},
								{name: "token_root", type: "address"},
								{name: "amount", type: "uint128"},
								{name: "sender_public_key", type: "uint256"},
								{name: "sender_address", type: "address"},
								{name: "sender_wallet", type: "address"},
								{name: "original_gas_to", type: "address"},
								{name: "updated_balance", type: "uint128"},
								{name: "payload_arg0", type: "uint8"},
								{name: "payload_arg1", type: "address"},
								{name: "payload_arg2", type: "address"},
								{name: "payload_arg3", type: "uint128"},
								{name: "payload_arg4", type: "uint128"},
							],
							name: "callbacks",
							type: "map(uint256,tuple)",
						},
					],
				},
			],
			data: [
				{key: 1, name: "rootDEX", type: "address"},
				{key: 2, name: "soUINT", type: "uint256"},
				{key: 3, name: "creator", type: "address"},
				{key: 4, name: "codeDEXConnector", type: "cell"},
				{key: 5, name: "rootA", type: "address"},
				{key: 6, name: "rootB", type: "address"},
				{key: 7, name: "rootAB", type: "address"},
			],
			events: [],
		},
		tvc: "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",
		code: "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",
	},
};
