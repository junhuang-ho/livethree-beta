import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from './App'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './themes/ThemeProvider';
import { HMSRoomProvider } from '@100mslive/react-sdk';
import { Web3AuthProvider } from "./contexts/Web3Auth"
import { FirebaseProvider } from './contexts/Firebase'
import { SuperfluidGasProvider } from './contexts/SuperfluidGas';
import { AuthenticationStateProvider } from './contexts/AuthenticationState';
import { SnackbarProvider } from 'notistack';

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <HMSRoomProvider>
                    <SnackbarProvider
                        maxSnack={ 3 }
                        anchorOrigin={ {
                            vertical: 'top',
                            horizontal: 'center',
                        } }
                    >
                        <Web3AuthProvider>
                            <FirebaseProvider>
                                <SuperfluidGasProvider>
                                    <AuthenticationStateProvider>
                                        <App />
                                    </AuthenticationStateProvider>
                                </SuperfluidGasProvider>
                            </FirebaseProvider>
                        </Web3AuthProvider>
                    </SnackbarProvider>
                </HMSRoomProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
)