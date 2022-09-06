import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { WALLET_ADAPTERS, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/web3auth";

import {
    getWeb3Provider as getRPCWeb3Provider,
    getSigner as getRPCSigner,
    getChainId as getRPCChainId,
    getAddress as getRPCAddress,
    getBalance as getRPCBalance,
    getPrivateKey as getRPCPrivateKey,
    signMessage as rpcSignMessage,
} from "../services/ethersRPC";
import {
    WEB3AUTH_CLIENT_ID, WEB3AUTH_CHAIN_CONFIG,
    CHAIN_NAME_DEFAULT, WEB3AUTH_CHAIN_CONFIG_TYPE,
    PLACEHOLDER_ADDRESS
} from "../constants/constants"

import { useUpdateEffect } from "../hooks/useUpdateEffect";

export interface IWeb3AuthContext {
    web3auth: any, // as web3authInstance
    web3authProvider: any, // as user
    rpcProvider: any, // as provider
    signer: any,
    chainId: any,
    address: any,
    nativeCoinBalance: any,
    isLoggingIn: boolean,
    refreshRPCData: () => void,
    refreshNativeBalance: () => void,
    login: () => Promise<void>,
    logout: () => Promise<void>,
    getBalance: () => Promise<any>,
    getUserInfo: () => Promise<any>,
    signMessage: (message: any) => Promise<any>,
    getPrivateKey: () => Promise<any>,
    setSelectedChain: (value: WEB3AUTH_CHAIN_CONFIG_TYPE) => void,
    setIsLoginReady: (value: boolean) => void,
}

export const Web3AuthContext = createContext<IWeb3AuthContext>({
    web3auth: null, // as web3authInstance
    web3authProvider: null, // as user
    rpcProvider: null, // as provider
    signer: null,
    chainId: null,
    address: PLACEHOLDER_ADDRESS,
    nativeCoinBalance: null,
    isLoggingIn: false,
    refreshRPCData: () => { },
    refreshNativeBalance: () => { },
    login: async () => { },
    logout: async () => { },
    getBalance: async () => { },
    getUserInfo: async () => { },
    signMessage: async (message: any) => { },
    getPrivateKey: async () => { },
    setSelectedChain: (value: WEB3AUTH_CHAIN_CONFIG_TYPE) => { },
    setIsLoginReady: (value: boolean) => { },
});

export const useWeb3Auth = (): IWeb3AuthContext => {
    return useContext(Web3AuthContext);
}

interface IWeb3AuthProps {
    children?: ReactNode;
}

const MESSAGE_1 = "web3auth not initialized yet"
const MESSAGE_2 = "wallet not initialized yet"

export const Web3AuthProvider = ({ children }: IWeb3AuthProps) => {
    const [web3auth, setWeb3Auth] = useState<Web3Auth | null>(null)
    const [web3authProvider, setWeb3AuthProvider] = useState<SafeEventEmitterProvider | null>(null)
    const [rpcProvider, setRPCProvider] = useState<any | null>(null)
    const [signer, setSigner] = useState<any | null>(null)
    const [chainId, setChainId] = useState<number | null | undefined>(null)
    const [address, setAddress] = useState<string | null | undefined>(null)
    const [nativeCoinBalance, setNativeCoinBalance] = useState<any | null | undefined>(null) // bignumber type??

    const [isLoginToggled, toggleLogin] = useState<boolean>(false)
    const [isRPCDataToggled, toggleRPCData] = useState<boolean>(false)
    const [isNativeBalanceToggled, toggleNativeBalance] = useState<boolean>(false)
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false)

    const [selectedChain, setSelectedChain] = useState<WEB3AUTH_CHAIN_CONFIG_TYPE>(CHAIN_NAME_DEFAULT)

    const [isLoginReady, setIsLoginReady] = useState<boolean>(false)

    // useEffect(() => {
    //     if (!window.ethereum) {
    //         // Nothing to do here... no ethereum provider found
    //         return;
    //     }

    //     window.ethereum.on('chainChanged', async (chainId: any) => {
    //         console.warn("new chain detected:", chainId)
    //         // refreshRPCData()
    //     });

    // }, [window.ethereum])

    useEffect(() => {
        const init = async () => {
            setIsLoggingIn(true)
            try {

                const web3auth = new Web3Auth({
                    clientId: WEB3AUTH_CLIENT_ID,
                    chainConfig: WEB3AUTH_CHAIN_CONFIG[selectedChain],
                    uiConfig: { appLogo: "https://raw.githubusercontent.com/junhuang-ho/miscellaneous/64fc258aefb53d20b6e520aa44c7e5be2bf10b06/l3-t1-crop.svg" },// ref: https://web3auth.io/docs/sdk/web/web3auth/initialize#uiconfig
                    authMode: 'DAPP',
                    storageKey: 'session'//'local'
                });

                await web3auth.initModal({
                    modalConfig: {
                        [WALLET_ADAPTERS.OPENLOGIN]: {
                            label: "openlogin",
                            loginMethods: {
                                email_passwordless: {
                                    showOnModal: false,
                                },
                            },
                        },
                        [WALLET_ADAPTERS.WALLET_CONNECT_V1]: {
                            showOnModal: false
                        },
                        [WALLET_ADAPTERS.WALLET_CONNECT_V2]: {
                            showOnModal: false
                        },
                        [WALLET_ADAPTERS.TORUS_SOLANA]: {
                            showOnModal: false
                        },
                        [WALLET_ADAPTERS.PHANTOM]: {
                            showOnModal: false
                        },
                        [WALLET_ADAPTERS.SOLLET]: {
                            showOnModal: false
                        },
                        [WALLET_ADAPTERS.SOLLET_EXTENSION]: {
                            showOnModal: false
                        },
                        [WALLET_ADAPTERS.SOLFLARE]: {
                            showOnModal: false
                        },
                        [WALLET_ADAPTERS.SLOPE]: {
                            showOnModal: false
                        },
                    },
                });

                // await web3auth.initModal()
                setWeb3Auth(web3auth)
                setIsLoggingIn(false)
                setWeb3AuthProvider(await web3auth.connect())

                refreshRPCData()
                refreshNativeBalance()
            } catch (error) {
                console.error("Web3Auth Init |", error);
            } finally {
                setIsLoginReady(false)
                setIsLoggingIn(false)
            }
        };
        if (isLoginReady) {
            init()
        }
    }, [selectedChain, isLoginToggled, isLoginReady]);

    useUpdateEffect(() => {
        const setEthersRPCData = async () => {
            setChainId(await getChainId())
            setAddress(await getAddress())
        }
        if (web3authProvider) {
            setRPCProvider(getRPCProvider())
            setSigner(getSigner())
            setEthersRPCData()
        }
    }, [web3authProvider, isRPCDataToggled])

    useUpdateEffect(() => {
        const refresh = async () => {
            setNativeCoinBalance(await getBalance())
        }
        if (web3authProvider && address) {
            refresh()
        }

    }, [web3authProvider, address, isNativeBalanceToggled])

    const refreshRPCData = () => {
        toggleRPCData(state => !state)
    }
    const refreshNativeBalance = () => {
        toggleNativeBalance(state => !state)
    }

    const login = async () => {
        if (!web3auth) {
            console.log(MESSAGE_1)
            return;
        }
        setSelectedChain(CHAIN_NAME_DEFAULT)
        toggleLogin(state => !state)
        // setWeb3AuthProvider(await web3auth.connect())
    };
    const logout = async () => {
        if (!web3auth) {
            console.log(MESSAGE_1);
            return;
        }
        await web3auth.logout();
        setWeb3AuthProvider(null);
        setRPCProvider(null)
        setSigner(null)
        setChainId(null)
        setAddress(PLACEHOLDER_ADDRESS)
        setNativeCoinBalance(null)
    };
    const getUserInfo = async () => {
        if (!web3auth) {
            console.log(MESSAGE_1);
            return;
        }
        return await web3auth.getUserInfo();
    };
    const getRPCProvider = () => {
        if (!web3authProvider) {
            console.log(MESSAGE_2);
            return;
        }

        return getRPCWeb3Provider(web3authProvider)
    };
    const getSigner = () => {
        if (!web3authProvider) {
            console.log(MESSAGE_2);
            return;
        }

        return getRPCSigner(web3authProvider)
    };
    const getChainId = async () => {
        if (!web3authProvider) {
            console.log(MESSAGE_2);
            return;
        }

        return await getRPCChainId(web3authProvider)
    };
    const getAddress = async () => {
        if (!web3authProvider) {
            console.log(MESSAGE_2);
            return;
        }

        return await getRPCAddress(web3authProvider)
    };
    const getBalance = async () => {
        if (!web3authProvider) {
            console.log(MESSAGE_2);
            return;
        }

        return await getRPCBalance(web3authProvider)
    };
    const getPrivateKey = async () => {
        if (!web3authProvider) {
            console.log(MESSAGE_2);
            return;
        }

        return await getRPCPrivateKey(web3authProvider)
    };
    const signMessage = async (message: any) => {
        if (!web3authProvider) {
            console.log(MESSAGE_2);
            return;
        }

        return await rpcSignMessage(web3authProvider, message)
    };

    // removed
    // settingUp,
    // loggingIn,
    // loggingOut,
    // connecting,
    const contextProvider = {
        web3auth, // as web3authInstance
        web3authProvider, // as user
        rpcProvider, // as provider
        signer,
        chainId,
        address,
        nativeCoinBalance,
        isLoggingIn,
        refreshRPCData,
        refreshNativeBalance,
        login,
        logout,
        getBalance,
        getUserInfo,
        signMessage,
        getPrivateKey,
        setSelectedChain,
        setIsLoginReady,
    };
    return (
        <Web3AuthContext.Provider value={ contextProvider }>
            { children }
        </Web3AuthContext.Provider>
    );
};