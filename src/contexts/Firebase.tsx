import { ReactNode, createContext, useContext, useState } from "react";
import { auth } from "../services/firebase";
import { signInWithCustomToken, browserSessionPersistence, signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore"
import { COL_REF_USERS } from "../services/firebase";

import axios from "axios"

import { useWeb3Auth } from "./Web3Auth";
import { useUpdateEffect } from "../hooks/useUpdateEffect";

import { PLACEHOLDER_ADDRESS } from "../constants/constants";

export interface IFirebaseContext {
    user: any,
    isLoggingIn: boolean,
    logout: () => Promise<void>,
    setOnline: (uid: any, isOnline: boolean) => Promise<void>,
    setReferrerAddress: (value: any) => void,
}

export const FirebaseContext = createContext<IFirebaseContext>({
    user: null,
    isLoggingIn: false,
    logout: async () => { },
    setOnline: async (uid: any, isOnline: boolean) => { },
    setReferrerAddress: (value: any) => { },
});

export const useFirebase = (): IFirebaseContext => {
    return useContext(FirebaseContext);
}

interface IFirebaseProps {
    children?: ReactNode;
}

const toHex = (stringToConvert: string) => {
    return stringToConvert
        .split('')
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('');
}

export const FirebaseProvider = ({ children }: IFirebaseProps) => {
    const { web3authProvider, address: localAddress, signMessage } = useWeb3Auth()
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false)
    const [user, setUser] = useState<any | null>(null)
    const [referrerAddress, setReferrerAddress] = useState<any>(null)

    useUpdateEffect(() => {
        const signInWithAddress = async (referrerAddress: string) => {
            setIsLoggingIn(true)
            try {
                await auth.setPersistence(browserSessionPersistence)

                const data1 = {
                    address: localAddress,
                    referrerAddress: referrerAddress
                }
                const resp1 = await axios.post("https://us-central1-moonlight-173df.cloudfunctions.net/getNonce", data1)
                const nonce = resp1.data.nonce

                const signature = await signMessage(`0x${ toHex(nonce) }`)

                const data2 = {
                    address: localAddress,
                    signature: signature
                }
                const resp2 = await axios.post("https://us-central1-moonlight-173df.cloudfunctions.net/verifySignedMessage", data2)
                const jwtToken = resp2.data.token

                signInWithCustomToken(auth, jwtToken)
                    .then((userCredential) => {
                        // Signed in
                        setUser(userCredential.user);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.error("Firebase Login:", errorCode)
                        setUser(null)
                    });
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoggingIn(false)
            }
        }

        if (web3authProvider && localAddress && localAddress !== PLACEHOLDER_ADDRESS && referrerAddress) {
            signInWithAddress(referrerAddress)
        }
    }, [web3authProvider, localAddress, referrerAddress])

    const logout = async () => {
        await signOut(auth)
    }

    const setOnline = async (uid: any, isOnline: boolean) => {
        if (!uid || uid === PLACEHOLDER_ADDRESS) {
            console.error("LiveThree: uid not ready")
            return
        }

        try {
            await updateDoc(doc(COL_REF_USERS, uid), {
                online: isOnline
            })
        } catch (error: any) {
            const ERROR_MSG = "Missing or insufficient permissions."
            if (error.message === ERROR_MSG) {
                console.warn('LiveThree setting online status:', error.message, '- error only hit on register')
            } else {
                console.error('LiveThree setting online status:', error, '- unexpected')
            }
        }
    }

    const contextProvider = {
        user,
        isLoggingIn,
        logout,
        setOnline,
        setReferrerAddress,
    };
    return (
        <FirebaseContext.Provider value={ contextProvider }>
            { children }
        </FirebaseContext.Provider>
    );
};