import {ethers, network} from "hardhat"
import {SimpleSwap} from "../typechain-types"
import {DeployFunction} from "hardhat-deploy/types"
import {developmentChains, networkConfig, VERIFICATION_BLOCK_CONFIRMATIONS} from "../helper-hardhat-config";
import verify from "../utils/verify";

const deploySimpleSwap: DeployFunction = async function ({deployments}) {
    const {deploy} = deployments
    const chainId = network.config.chainId!
    const deployer = (await ethers.getSigners())[0]
    const args = [networkConfig[chainId].swapRouterAddress]

    const waitBlockConfirmations = developmentChains.includes(network.name) ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS

    console.log("Deploying SimpleSwap contract...")
    const simpleSwap = await deploy("SimpleSwap", {
        from: deployer.address,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    console.log(`SimpleSwap contract deployed at ${simpleSwap.address}`)

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        console.log("Verifying...")
        await verify(simpleSwap.address, args)
    }
}

export default deploySimpleSwap
