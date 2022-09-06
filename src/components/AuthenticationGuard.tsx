import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase';

import { SplashPage } from '../pages/others/SplashPage';

import { useWeb3Auth } from '../contexts/Web3Auth';
import { useFirebase } from "../contexts/Firebase";

import { ethers } from 'ethers';

export const AuthenticationGuard = ({ children }: { children: JSX.Element }) => {
    const [firebaseUser, isLoadingFirebaseUser] = useAuthState(auth)
    const { setOnline } = useFirebase()
    const { address: localAddress } = useWeb3Auth() // setIsLoginReady

    // useEffect(() => {
    //     setIsLoginReady(true)
    // }, [])

    useEffect(() => {
        const setOffline = async () => {
            await setOnline(firebaseUser?.uid, false)
        }
        window.addEventListener('beforeunload', setOffline) // https://developer.mozilla.org/en-US/docs/Web/API/Window#load_unload_events
        return () => {
            window.removeEventListener('beforeunload', setOffline)
        }
    }, [firebaseUser])

    if (isLoadingFirebaseUser) {
        return <SplashPage />
    }

    if (firebaseUser && ethers.utils.isAddress(localAddress)) {
        setOnline(firebaseUser?.uid, true)
        return children
    }

    return <Navigate to="/sign-in/default" replace />
}