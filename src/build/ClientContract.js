const ClientContract = {
    abi: {
        "ABI version": 2,
        "version": "2.2",
        "header": [
            "time",
            "expire"
        ],
        "functions": [
            {
                "name": "constructor",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "sendTransaction",
                "inputs": [
                    {
                        "name": "dest",
                        "type": "address"
                    },
                    {
                        "name": "value",
                        "type": "uint128"
                    },
                    {
                        "name": "bounce",
                        "type": "bool"
                    },
                    {
                        "name": "flags",
                        "type": "uint8"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "deleteContract",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "getPubKey",
                "inputs": [],
                "outputs": [
                    {
                        "name": "pubkey",
                        "type": "uint256"
                    }
                ]
            }
        ],
        "data": [],
        "events": [],
        "fields": [
            {
                "name": "_pubkey",
                "type": "uint256"
            },
            {
                "name": "_timestamp",
                "type": "uint64"
            },
            {
                "name": "_constructorFlag",
                "type": "bool"
            }
        ]
    },
    tvc: "te6ccgECFQEAAm4AAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgBCSK7VMg4wMgwP/jAiDA/uMC8gsSBQQUAujtRNDXScMB+GaNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT4aSHbPNMAAY4SgQIA1xgg+QFY+EIg+GX5EPKo3tM/AfhDIbnytCD4I4ED6KiCCBt3QKC58rT4Y9MfAfgjvPK50x8B2zzyPAgGA1LtRNDXScMB+GYi0NMD+kAw+GmpOADcIccA4wIh1w0f8rwh4wMB2zzyPBERBgRQIIIQBfPGkrrjAiCCEBq1Bg264wIgghBM7mRsuuMCIIIQaLVfP7rjAg0LCQcCIjD4Qm7jAPhG8nPR+ADbPPIACA4BPu1E0NdJwgGOFHDtRND0BYBA9A7yvdcL//hicPhj4w0QA0Qw+Eby4Ez4Qm7jACGT1NHQ3vpA03/SANMH1NHbPDDbPPIAEAoOAFT4RSBukjBw3vhCuvLgZPgAVQJVEsjPhYDKAHPPQM4B+gJxzwtqzMkB+wADgDD4RvLgTPhCbuMA0ds8IY4oI9DTAfpAMDHIz4cgzo0EAAAAAAAAAAAAAAAACatQYNjPFsv/yXD7AJEw4uMA8gAQDA4AFPgA+EUgbpIwcN4DJjD4RvLgTPhCbuMA0ds8MNs88gAQDw4AHPhD+ELIy//LP8+Dye1UAEL4RSBukjBw3vhCuvLgZPgA+EnIz4UIzoBvz0DJgQCg+wAAHu1E0NP/0z/TADHR+GP4YgAK+Eby4EwCCvSkIPShFBMAFHNvbCAwLjUzLjAAAA==",
    code: "te6ccgECEgEAAkEABCSK7VMg4wMgwP/jAiDA/uMC8gsPAgERAujtRNDXScMB+GaNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT4aSHbPNMAAY4SgQIA1xgg+QFY+EIg+GX5EPKo3tM/AfhDIbnytCD4I4ED6KiCCBt3QKC58rT4Y9MfAfgjvPK50x8B2zzyPAUDA1LtRNDXScMB+GYi0NMD+kAw+GmpOADcIccA4wIh1w0f8rwh4wMB2zzyPA4OAwRQIIIQBfPGkrrjAiCCEBq1Bg264wIgghBM7mRsuuMCIIIQaLVfP7rjAgoIBgQCIjD4Qm7jAPhG8nPR+ADbPPIABQsBPu1E0NdJwgGOFHDtRND0BYBA9A7yvdcL//hicPhj4w0NA0Qw+Eby4Ez4Qm7jACGT1NHQ3vpA03/SANMH1NHbPDDbPPIADQcLAFT4RSBukjBw3vhCuvLgZPgAVQJVEsjPhYDKAHPPQM4B+gJxzwtqzMkB+wADgDD4RvLgTPhCbuMA0ds8IY4oI9DTAfpAMDHIz4cgzo0EAAAAAAAAAAAAAAAACatQYNjPFsv/yXD7AJEw4uMA8gANCQsAFPgA+EUgbpIwcN4DJjD4RvLgTPhCbuMA0ds8MNs88gANDAsAHPhD+ELIy//LP8+Dye1UAEL4RSBukjBw3vhCuvLgZPgA+EnIz4UIzoBvz0DJgQCg+wAAHu1E0NP/0z/TADHR+GP4YgAK+Eby4EwCCvSkIPShERAAFHNvbCAwLjUzLjAAAA==",
    codeHash: "1ef030bc50d437bb4ba41fdb904199a9fbc82126a8d12f2daad6a3c491703c77",
};
module.exports = { ClientContract };