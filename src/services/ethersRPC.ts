import { ethers } from "ethers"

import { SafeEventEmitterProvider } from "@web3auth/base";

export const getWeb3Provider = (rawProvider: SafeEventEmitterProvider) => {
    return new ethers.providers.Web3Provider(rawProvider)
}

export const getSigner = (rawProvider: SafeEventEmitterProvider) => {
    const web3Provider = getWeb3Provider(rawProvider)
    return web3Provider.getSigner()
}

export const getChainId = async (rawProvider: SafeEventEmitterProvider) => {
    const signer = getSigner(rawProvider)
    return await signer.getChainId()
}

export const getAddress = async (rawProvider: SafeEventEmitterProvider) => {
    const signer = getSigner(rawProvider)
    return await signer.getAddress()
}

export const getBalance = async (rawProvider: SafeEventEmitterProvider) => {
    const signer = getSigner(rawProvider)
    return await signer.getBalance()
}

export const getPrivateKey = async (rawProvider: SafeEventEmitterProvider) => {
    return await rawProvider.request({
        method: "eth_private_key",
    });
}

export const signMessage = async (rawProvider: SafeEventEmitterProvider, message: any) => {
    const signer = getSigner(rawProvider)
    return await signer.signMessage(message)
}

// export const signTransaction = async (rawProvider: SafeEventEmitterProvider, transactionRequest: any) => {
//     const signer = getSigner()
//     return await signer.signMessage(transactionRequest)
// }

// export const sendTransaction = async (rawProvider: SafeEventEmitterProvider, transactionRequest: any) => {
//     const signer = getSigner()
//     return await signer.signMessage(transactionRequest)
// }