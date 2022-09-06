import { useState } from "react";

import { useWeb3Auth } from "../../contexts/Web3Auth"

import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { StandardButton } from "../styled";

import { DialogExposeSecrets } from "../dialogs/DialogExposeSecrets";

import { useSnackbar } from 'notistack';

export const ExposeSecrets = () => {
    const { getPrivateKey } = useWeb3Auth()

    const [privateKey, setPrivateKey] = useState<string | null | unknown>(null)
    const [open, setOpen] = useState<boolean>(false)

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const action = (snackbarId: any) => (
        <>
            <Button onClick={ () => { closeSnackbar(snackbarId) } } sx={ { color: "black" } }>
                Dismiss
            </Button>
        </>
    );

    return (
        <Card
            variant="outlined"
            sx={ { width: "100%" } }
        >
            <CardHeader
                title="Reveal Private Key"
                sx={ {
                    "&:last-child": {
                        paddingLeft: 24
                    }
                } }
            />
            <CardContent>
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <StandardButton
                        variant="contained"
                        onClick={ async () => {
                            try {
                                const privateKey = await getPrivateKey()

                                setPrivateKey(privateKey)
                                setOpen(true)
                            } catch (error: any) {
                                const ERROR_MSG = 'The method "eth_private_key" does not exist / is not available.'
                                if (error.message === ERROR_MSG) {
                                    enqueueSnackbar(`Private key reveal not available when connected to an external wallet.`, { variant: 'info', autoHideDuration: 4000, action })
                                } else {
                                    console.error(error.message)
                                }
                            }

                        } }
                    >
                        reveal
                    </StandardButton >
                </Stack>
            </CardContent>
            <DialogExposeSecrets open={ open } setOpen={ setOpen } privateKey={ privateKey } />
        </Card >
    )
}
