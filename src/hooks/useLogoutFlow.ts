import { useState } from "react";

import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from 'react-router-dom';
import { useWeb3Auth } from '../contexts/Web3Auth';
import { useFirebase } from "../contexts/Firebase";
import { useSuperfluidGas } from '../contexts/SuperfluidGas';

export const useLogoutFlow = (uid: any) => {
    const navigate = useNavigate();
    const { logout: logoutWeb3Auth } = useWeb3Auth()
    const { setOnline } = useFirebase()
    const { setIsCheckNetFlow } = useSuperfluidGas()

    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)

    const logout = async () => {
        setIsLoggingOut(true)

        await setOnline(uid, false)
        setIsCheckNetFlow(false)
        await logoutWeb3Auth()
        await signOut(auth)

        navigate('/', { replace: true })

        setIsLoggingOut(false)
    }

    return { logout, isLoggingOut }
}
