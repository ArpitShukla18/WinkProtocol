import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy"

require("dotenv").config()

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const GOERLI_URL = process.env.GOERLI_URL || ""
const MAINNET_URL = process.env.MAINNET_URL || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY!

const config: HardhatUserConfig = {
    solidity: "0.7.6",
    networks: {
        hardhat: {
            chainId: 31337,
            forking: {
                url: MAINNET_URL
            }
        },
        localhost: {
            chainId: 31337
        },
        goerli: {
            chainId: 5,
            url: GOERLI_URL,
            accounts: [PRIVATE_KEY],
        }
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY
    },
    namedAccounts: {
        deployer: {
            default: 0
        }
    }
};

export default config;
