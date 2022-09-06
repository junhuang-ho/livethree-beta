import { useEffect } from 'react';

import livethreeGrey from '../../assets/livethree-crop-grey-bg.png'

import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { SplashPage } from './SplashPage';

import { useWeb3Auth } from '../../contexts/Web3Auth'
import { useFirebase } from '../../contexts/Firebase';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase';

const SignInPage = () => {
    const { login: loginWeb3Auth, isLoggingIn: isWeb3AuthLoggingIn, setIsLoginReady } = useWeb3Auth()
    const { isLoggingIn: isFirebaseLoggingIn } = useFirebase()

    const [firebaseUser, isLoadingFirebaseUser] = useAuthState(auth);

    useEffect(() => {
        setIsLoginReady(true)
    }, [])

    if (!firebaseUser && !isFirebaseLoggingIn && !isLoadingFirebaseUser) {
        return (
            <Stack
                alignItems="center"
                justifyContent="center"
                spacing={ 3 }
                sx={ { height: "100vh", pb: 15 } }
            >
                <Box
                    component="img"
                    sx={ {
                        alignItems: "center",
                        justifyContent: "center",
                    } }
                    alt="logo"
                    src={ livethreeGrey }
                />
                <Button
                    variant='contained'
                    disabled={ isWeb3AuthLoggingIn }
                    onClick={ async () => {
                        await loginWeb3Auth()
                    } }
                >
                    <Typography>
                        <Box component="span" sx={ { textTransform: 'uppercase', fontWeight: 'bold' } } display='inline'>
                            sign in
                        </Box>
                    </Typography>
                </Button>
            </Stack>
        )
    }

    return <SplashPage />
}

export default SignInPage