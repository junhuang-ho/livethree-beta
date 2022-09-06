import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

import InfoIcon from '@mui/icons-material/Info';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { IconButton, StyledGasBadge, StyledGasBadgeMini } from "../styled";
import { IconGas } from '../icons/IconGas';

import { ethers } from 'ethers';

import { useCall } from '../../contexts/Call';
import { useSuperfluidGas } from '../../contexts/SuperfluidGas';
import { useTheme } from '@mui/material/styles';

import { CALL_PENDING_EXPIRE_IN_S, END_CALL_BUFFER_SECONDS } from '../../constants/constants';
import { useEffect, useState } from 'react';
import { secondsToDHMS } from '../../utils'


import { analytics } from '../../services/firebase';
import { logEvent } from 'firebase/analytics';

export const DialogPreCallDetails = ({ open, setOpen, deposit, restartTimer, address, flowRate, isOnline, isActive }: any) => {
    const theme = useTheme()
    const { initiateCall, isInitiating } = useCall()
    const { tokenXBalance, tokenXSymbol } = useSuperfluidGas()

    const [datetime, setDatetime] = useState<any>(null)
    const [availableSeconds, setAvailableSeconds] = useState<any>(null)

    useEffect(() => {
        setDatetime(new Date())
    }, [])

    useEffect(() => {
        const run = () => {
            setAvailableSeconds((ethers.BigNumber.from(tokenXBalance)?.sub(deposit))?.div(ethers.BigNumber.from(flowRate)))
        }
        if (tokenXBalance && deposit) {
            run()
        }
    }, [tokenXBalance, deposit])

    return (
        <Dialog
            disableEscapeKeyDown
            open={ open }
            onClose={ () => {
                setOpen(false)

            } }
        >
            <DialogTitle id="responsive-dialog-title">
                { "IMPORTANT NOTICE" }
            </DialogTitle>
            <DialogContent>
                { datetime && availableSeconds && deposit && tokenXBalance && tokenXSymbol &&
                    <Box>
                        <DialogContentText align="justify">
                            You are about to start a money streaming video call.
                        </DialogContentText>
                        <Box sx={ { p: 1 } }></Box>
                        <DialogContentText align="justify" sx={ { display: 'list-item' } }>
                            Flow rate: { ethers.utils.formatEther(flowRate) } { tokenXSymbol } per second
                        </DialogContentText>
                        <Stack direction="row" alignItems="center">
                            <DialogContentText align="justify" sx={ { display: 'list-item' } }>
                                Deposit: { Number(ethers.utils.formatEther(deposit?.toString())).toFixed(4) } { tokenXSymbol }.
                            </DialogContentText>
                            <Tooltip title="The deposit is permanently deducted if your funds available for call has run out before the call (and money stream) is ended">
                                <Avatar
                                    sx={ { bgcolor: theme.palette.secondary.main, width: 16, height: 16, ml: 1 } }
                                >
                                    <InfoIcon sx={ { width: "80%", height: "80%" } } />
                                </Avatar>
                            </Tooltip>
                        </Stack>
                        <Stack direction="row" alignItems="center">
                            <DialogContentText align="justify" sx={ { display: 'list-item' } }>
                                Funds available for call (after deposit deduction): { Number(ethers.utils.formatEther((ethers.BigNumber.from(tokenXBalance).sub(deposit))?.toString())).toFixed(4) } { tokenXSymbol }.
                                This can last for <Box component="span" fontWeight='fontWeightMedium' display='inline'>{ secondsToDHMS(availableSeconds.toNumber()) } </Box>
                                (maximum duration) based on the flow rate.
                            </DialogContentText>
                            <Tooltip title="Topping-up additional funds during the video call currently does not extend this duration">
                                <Avatar
                                    sx={ { bgcolor: theme.palette.secondary.main, width: 16, height: 16, ml: 1 } }
                                >
                                    <InfoIcon sx={ { width: "80%", height: "80%" } } />
                                </Avatar>
                            </Tooltip>
                        </Stack>
                        <DialogContentText align="justify" sx={ { display: 'list-item' } }>
                            LiveThree would attempt to end the call <Box component="span" fontWeight='fontWeightMedium' display='inline'>{ Number(END_CALL_BUFFER_SECONDS) } seconds</Box> before the available funds runs out. [auto end call]
                        </DialogContentText>
                        <DialogContentText align="justify" sx={ { display: 'list-item' } }>
                            By starting the money streaming video call, you have acknowledged and understand that the sole responsibility of ending
                            <StyledGasBadgeMini badgeContent={ <IconGas /> }><Tooltip title="End money streaming video call"><IconButton variant="contained" color="error" sx={ { ml: 1, mr: 1 } }><CallEndIcon /></IconButton></Tooltip></StyledGasBadgeMini>
                            the money streaming video call in the { ' ' }
                            <Link
                                href="https://medium.com/@livethreeweb/livethree-best-practices-46cece670248"
                                target="_blank"
                                rel="noopener"
                            >
                                correct way
                            </Link>
                            { ' ' } lies with you, or risk losing the deposit.
                        </DialogContentText>
                        <DialogContentText align="justify" sx={ { display: 'list-item' } }>
                            <Box component="span" fontWeight='fontWeightMedium' display='inline'>If you are using an external wallet</Box>,
                            you must confirm the transaction to end the call after
                            the video call ends (for both manual or auto call end)
                        </DialogContentText>
                    </Box>
                }

            </DialogContent>
            <DialogActions>
                <Button
                    disabled={ isInitiating }
                    onClick={ () => {
                        setOpen(false)
                    } }
                >
                    CANCEL
                </Button>
                <StyledGasBadge badgeContent={ < IconGas /> }>
                    <Button
                        disabled={ isInitiating || !isOnline || isActive }
                        onClick={ async () => {
                            await initiateCall(address)
                            logEvent(analytics, "call_initiated")
                            const expiryTimestamp = new Date();
                            expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + Number(CALL_PENDING_EXPIRE_IN_S));
                            restartTimer(expiryTimestamp)
                            setOpen(false)
                        } }
                    >
                        AGREE AND START CALL
                    </Button>
                </StyledGasBadge>
            </DialogActions>
        </Dialog>
    )
}
