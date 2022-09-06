import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { CallProvider } from './contexts/Call';
import { MainLayout } from './layouts/MainLayout';
import { SplashPage } from './pages/others/SplashPage';
import { AuthenticationGuard } from './components/AuthenticationGuard';
// import ErrorPage from './pages/others/ErrorPage';

import { useResponsive } from './hooks/useResponsive';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// ---- lazy loading ref ---- //
// https://www.youtube.com/watch?v=0mQbxF-_S-M&ab_channel=uidotdev
// https://www.youtube.com/watch?v=MJn4W7pR6RU&list=PLC3y8-rFHvwjkxt8TOteFdT_YmzwpBlrG&index=15&ab_channel=Codevolution
const SignInPage = React.lazy(() => import('./pages/others/SignInPage'))
const ErrorPage = React.lazy(() => import('./pages/others/ErrorPage'))
const ProfileMePage = React.lazy(() => import('./pages/mains/ProfileMePage'))
const ProfileYouPage = React.lazy(() => import('./pages/subs/ProfileYouPage'))
const FavouritesPage = React.lazy(() => import('./pages/mains/FavouritesPage'))
const CallsPage = React.lazy(() => import('./pages/mains/CallsPage'))
const SettingsPage = React.lazy(() => import('./pages/mains/SettingsPage'))
const CallOneOnOnePage = React.lazy(() => import('./pages/subs/CallOneOnOnePage'))
const ReferralGuard = React.lazy(() => import('./components/ReferralGuard'))

export const App = () => {
    const isMobile = useResponsive('down', 'sm');

    return (
        <Box>
            { isMobile &&
                <Paper square sx={ { width: '100%', p: 3, backgroundColor: 'warning.main' } }>
                    <Typography align='center'>Please consider using desktop/laptop browser.</Typography>
                </Paper>
            }
            <Routes>
                <Route path='/' element={
                    <AuthenticationGuard>
                        <CallProvider>
                            <MainLayout />
                        </CallProvider>
                    </AuthenticationGuard>
                } >
                    <Route path='/my-profile' element={ <React.Suspense fallback={ <SplashPage /> }><ProfileMePage /> </React.Suspense> } />
                    <Route path='/user/:address' element={ <React.Suspense fallback={ <SplashPage /> }><ProfileYouPage /></React.Suspense> } />
                    <Route path='/favourites' element={ <React.Suspense fallback={ <SplashPage /> }><FavouritesPage /></React.Suspense> } />
                    <Route path='/calls' element={ <React.Suspense fallback={ <SplashPage /> }><CallsPage /></React.Suspense> } />
                    <Route path='/settings' element={ <React.Suspense fallback={ <SplashPage /> }><SettingsPage /></React.Suspense> } />
                    <Route path='/call/:caller/:callee/:flowRate' element={ <React.Suspense fallback={ <SplashPage /> }><CallOneOnOnePage /></React.Suspense> } />
                    <Route index element={ <React.Suspense fallback={ <SplashPage /> }><ProfileMePage /></React.Suspense> } />
                </Route >
                <Route path='/sign-in/:address' element={
                    <React.Suspense fallback={ <SplashPage /> }>
                        <ReferralGuard>
                            <SignInPage />
                        </ReferralGuard>
                    </React.Suspense>
                } />
                <Route
                    path="*"
                    element={ <React.Suspense fallback={ <SplashPage /> }><ErrorPage /></React.Suspense> }
                />

            </Routes >
        </Box>
    )
}
