export interface networkConfigItem {
    name: string,
    swapRouterAddress: string,
    daiToken: string,
    wethToken: string
}

export interface networkConfigInfo {
    [key: number]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    31337: {
        name: "hardhat",
        swapRouterAddress: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
        daiToken: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        wethToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    },
    5: {
        name: "goerli",
        swapRouterAddress: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
        daiToken: "0x73967c6a0904aA032C103b4104747E88c566B1A2",
        wethToken: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
    }
}

export const developmentChains = ["hardhat", "localhost"]
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6
