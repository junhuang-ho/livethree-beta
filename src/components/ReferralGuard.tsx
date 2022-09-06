import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useFirebase } from '../contexts/Firebase';
// import { useHttpsCallable } from 'react-firebase-hooks/functions';

import { doc, getDoc } from 'firebase/firestore';
// import { functions } from '../services/firebase'

import { InvalidReferralPage } from '../pages/others/InvalidReferralPage';
import { SplashPage } from '../pages/others/SplashPage';
import { ethers } from 'ethers';

import { COL_REF_USERS } from '../services/firebase';

const DEFAULT_SIGN_IN_PATH = 'default'

const ReferralGuard = ({ children }: { children: JSX.Element }) => {
    const params = useParams()

    // const [isAddressExists] = useHttpsCallable(functions, 'isAddressExists');

    const [isValidAddress, setIsValidAddress] = useState<boolean>(false)
    const [isProcessed, setIsProcessed] = useState<boolean>(false)

    const { setReferrerAddress } = useFirebase()

    useEffect(() => {
        const checkIsAddressExists = async () => {
            // const data = {
            //     address: params.address
            // }
            // const resp = await isAddressExists(data) // return data is just a boolean value
            // if (resp?.data) {
            //     setIsValidAddress(true)
            // }

            if (ethers.utils.isAddress(params?.address!)) {
                const userDocRef = doc(COL_REF_USERS, params.address)
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    // docSnap.data()
                    setIsValidAddress(true)
                }
            }

            setIsProcessed(true)
        }

        if (params?.address && params?.address !== DEFAULT_SIGN_IN_PATH) {
            checkIsAddressExists()
        }
    }, [params?.address])

    if (isProcessed || params?.address === DEFAULT_SIGN_IN_PATH) {
        if (isValidAddress || params?.address === DEFAULT_SIGN_IN_PATH) {
            setReferrerAddress(params?.address)
            return children
        } else {
            return <InvalidReferralPage />
        }
    }

    return <SplashPage />
}

export default ReferralGuard