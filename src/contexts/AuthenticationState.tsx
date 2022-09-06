import { createContext, useContext, useEffect, useState } from 'react'
import { useWeb3Auth } from './Web3Auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase';

import { ethers } from 'ethers';

export interface IAuthenticationStateContext {
    firebaseUser: any
    isLoadingFirebaseUser: boolean
    isDebugger: boolean
    setIsDebugger: (value: boolean) => void
}

export const AuthenticationStateContext = createContext<IAuthenticationStateContext>({
    firebaseUser: null,
    isLoadingFirebaseUser: false,
    isDebugger: false,
    setIsDebugger: (value: boolean) => { },
})

export const useAuthenticationState = (): IAuthenticationStateContext => {
    return useContext(AuthenticationStateContext);
}

export const AuthenticationStateProvider = ({ children }: { children: JSX.Element }) => {
    const navigate = useNavigate();
    const { address: localAddress } = useWeb3Auth()
    const [firebaseUser, isLoadingFirebaseUser] = useAuthState(auth);
    const [isDebugger, setIsDebugger] = useState<boolean>(false)

    useEffect(() => {
        if (firebaseUser && ethers.utils.isAddress(localAddress)) {
            navigate('/', { replace: true })
        }
    }, [firebaseUser, localAddress])

    const contextProvider = {
        firebaseUser,
        isLoadingFirebaseUser,
        isDebugger,
        setIsDebugger,
    }
    return (
        <AuthenticationStateContext.Provider value={ contextProvider }>
            { children }
        </AuthenticationStateContext.Provider>
    )
}
