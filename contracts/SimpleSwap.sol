// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;
pragma abicoder v2;

import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';

contract SimpleSwap {

    ISwapRouter public immutable swapRouter;

    constructor(ISwapRouter _swapRouter) {
        swapRouter = _swapRouter;
    }

    function swapTokens(
        address tokenIn,
        address tokenOut,
        uint24 feeTier,
        uint256 amountIn
    ) external {
        // Transfer the specified amount of WETH9 to this contract.
        TransferHelper.safeTransferFrom(tokenIn, msg.sender, address(this), amountIn);
        // Approve the router to spend WETH9.
        TransferHelper.safeApprove(tokenIn, address(swapRouter), amountIn);
        // Note: To use this example, you should explicitly set slippage limits, omitting for simplicity
        uint32 minOut = /* Calculate min output */ 0;
        uint32 priceLimit = /* Calculate price limit */ 0;
        // Create the params that will be used to execute the swap
        ISwapRouter.ExactInputSingleParams memory params =
        ISwapRouter.ExactInputSingleParams({
        tokenIn : tokenIn,
        tokenOut : tokenOut,
        fee : feeTier,
        recipient : msg.sender,
        deadline : block.timestamp,
        amountIn : amountIn,
        amountOutMinimum : minOut,
        sqrtPriceLimitX96 : priceLimit
        });
        // The call to `exactInputSingle` executes the swap.
        swapRouter.exactInputSingle(params);
    }
}
