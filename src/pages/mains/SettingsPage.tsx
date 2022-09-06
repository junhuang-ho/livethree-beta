// import { useEffect } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack"

import { FlowRate } from "../../components/settings/FlowRate";
import { WrapToken } from "../../components/settings/WrapToken";
import { Permissions } from "../../components/settings/Permissions";
import { BuyToken } from "../../components/settings/BuyToken";
import { SendToken } from "../../components/settings/SendToken";
import { DeleteFlow } from "../../components/settings/DeleteFlow";
import { Support } from "../../components/settings/Support";
import { Ringtone } from "../../components/settings/Ringtone";
import { ChangeHandle } from "../../components/settings/ChangeHandle";
import { ExposeSecrets } from "../../components/settings/ExposeSecrets";
import { Logout } from "../../components/settings/Logout";

// import { useWeb3Auth } from "../../contexts/Web3Auth";
// import { useSuperfluidGas } from "../../contexts/SuperfluidGas";

const SettingsPage = () => {
    // const { refreshNativeBalance } = useWeb3Auth()
    // const { refreshSFStates } = useSuperfluidGas()

    // useEffect(() => {  // doesn't really work as WalletDisplay component not in focus?
    //     refreshNativeBalance()
    //     refreshSFStates()
    //     console.log("refresh states")
    // }, [])

    return (
        <Stack alignItems="center">
            <Box sx={ { p: 2, width: "98%", maxWidth: 1000 } }>
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    spacing={ 1 }
                >
                    <FlowRate />
                    <BuyToken />
                    <WrapToken />
                    <Permissions />
                    <DeleteFlow />
                    <SendToken />
                    <ChangeHandle />
                    <Ringtone />
                    <Support />
                    <ExposeSecrets />
                    <Logout />
                    {/* <Feedback /> */ }
                    <Box sx={ { p: 5 } }></Box>
                </Stack>
            </Box>
        </Stack>
    )
}

export default SettingsPage