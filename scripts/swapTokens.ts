import {network, deployments, ethers} from "hardhat"
import {networkConfig} from "../helper-hardhat-config";
import {BigNumber} from "ethers";

async function swapTokens() {
    const {address} = await deployments.get("SimpleSwap")
    const [deployer] = await ethers.getSigners()
    const chainId = network.config.chainId!
    const simpleSwap = await ethers.getContractAt("SimpleSwap", address, deployer)

    const tokenIn = networkConfig[chainId].wethToken
    const tokenOut = networkConfig[chainId].daiToken
    const swapAmount = ethers.utils.parseEther(".01")

    console.log("Approving transaction...")
    const tokenInContract = await ethers.getContractAt("IERC20", tokenIn, deployer)
    const approvalRequest = await tokenInContract.approve(simpleSwap.address, swapAmount)
    await approvalRequest.wait()
    console.log("Transaction approved!")

    console.log("Swapping tokens...")
    const gasLimit = ethers.utils.parseEther("0.0001")
    const feeTier = BigNumber.from("3000")
    await simpleSwap.swapTokens(tokenIn, tokenOut, feeTier, swapAmount, {gasLimit})
    console.log("Swapped!")

}

swapTokens()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
