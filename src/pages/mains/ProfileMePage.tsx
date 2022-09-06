import { useEffect } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { doc } from "firebase/firestore"
import { useNavigate, useLocation } from 'react-router-dom';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { Header } from '../../components/profile/Header';
import { About } from '../../components/profile/About';
import { Description } from '../../components/profile/Description';
import { SplashPage } from '../others/SplashPage';
import ErrorPage from '../others/ErrorPage';

import { COL_REF_USERS } from "../../services/firebase";

import { useWeb3Auth } from '../../contexts/Web3Auth';
import { useAuthenticationState } from '../../contexts/AuthenticationState'

import { PLACEHOLDER_ADDRESS } from '../../constants/constants'

type LocationProps = {
    state: {
        from: Location;
    };
};

const ProfileMePage = () => {
    const navigate = useNavigate();
    const location = useLocation() as unknown as LocationProps; // https://github.com/reach/router/issues/414#issuecomment-1056839570

    const { address: localAddress } = useWeb3Auth()
    const [dataUserLocal, dataUserLocalLoading, dataUserLocalError] = useDocumentData(doc(COL_REF_USERS, localAddress));

    const { setIsDebugger } = useAuthenticationState()
    useEffect(() => {
        if (dataUserLocal && dataUserLocal?.debugger) {
            setIsDebugger(true)
        } else {
            setIsDebugger(false)
        }
    }, [dataUserLocal]) // DEBUGGER code

    if (dataUserLocalLoading) {
        return <SplashPage />
    }

    if (dataUserLocalError) {
        return <ErrorPage message="ProfileMePage" />
    }

    return (
        <Box>
            <Stack alignItems="center">
                <Box sx={ { p: 2, width: "98%", maxWidth: 1000 } }>
                    { dataUserLocal ? (
                        <Stack spacing={ 1 } alignItems="center" justifyContent="center" sx={ { pb: 1 } }>
                            <Tooltip title="preview">
                                <IconButton
                                    color="secondary"
                                    onClick={ () => {
                                        navigate(`/user/${ dataUserLocal?.address }`, {
                                            state: {
                                                from: location,
                                            }
                                        })
                                    } }
                                >
                                    <VisibilityIcon />
                                </IconButton>
                            </Tooltip>
                            <Header uid={ localAddress } dataUser={ dataUserLocal } showcaseMode={ false } />
                            <About uid={ localAddress } dataUser={ dataUserLocal } showcaseMode={ false } />
                            <Description uid={ localAddress } dataUser={ dataUserLocal } showcaseMode={ false } />
                        </Stack>
                    ) : (<Box>Loading...</Box>)
                    }

                    {/* TODO enhancement: "masonry" for miscellaneous content like twitch */ }
                </Box >
            </Stack >
        </Box>
    )
}

export default ProfileMePage