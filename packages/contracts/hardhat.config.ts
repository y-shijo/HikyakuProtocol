import '@nomicfoundation/hardhat-toolbox'
import * as dotenv from 'dotenv'
import 'hardhat-deploy'
import { HardhatUserConfig } from 'hardhat/config'
dotenv.config()

const config: HardhatUserConfig = {
    solidity: {
        version: '0.8.9',
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
            },
            viaIR: true,
        },
    },
    networks: {
        hardhat: {
            chainId: 1337,
            // accounts: {
            //     mnemonic: process.env.DEPLOYER_MNEMONIC,
            //     count: 10,
            // },
        },
        mumbai: {
            chainId: 80001,
            url: process.env.POLYGON_MUMBAI_URL || 'https://rpc.ankr.com/polygon_mumbai',
            accounts: [process.env.DEPLOYER_PK_PROD as string],
        },
        goerli: {
            chainId: 5,
            url: process.env.GOERLI_URL || 'https://rpc.ankr.com/eth_goerli',
            accounts: [process.env.DEPLOYER_PK_PROD as string],
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    verify: {
        etherscan: {
            apiKey: `${process.env.POLYGONSCAN_API_KEY}`,
        },
    },
}

export default config
