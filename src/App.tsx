import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { App as AppProvider, Button, ConfigProvider, Layout } from 'antd';
import ruRU from 'antd/locale/ru_RU';

import './backend/axios';
import NotificationsProvider from 'global/NotificationsProvider';
import { Footer } from 'layout/footer';
import { AppRoutes } from 'navigation/routes';
import { logout } from 'store/auth/reducer';
import { getUserData } from 'views/auth/login/helpers';
import { LogoutIcon } from './icons/logout';
import { getAuth } from './store/auth/selectors';
import { AppTheme } from './theme';
import './App.scss';

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const {
        user,
        isUserLoggedIn,
        isCheckingToken
    } = useSelector(getAuth);

    useEffect(() => {
        if (isUserLoggedIn) {
            getUserData(user, navigate, pathname);
        } else {
            dispatch(logout());
        }
    }, []);

    return (
        <ConfigProvider locale={ruRU} theme={AppTheme}>

            <AppProvider>
                <NotificationsProvider />
                <Layout>
                    {isUserLoggedIn && (
                        <Button
                          danger
                          type="text"
                          size="small"
                          onClick={() => {
                                dispatch(logout());
                            }}
                        >
                            <LogoutIcon />
                        </Button>
                    )}

                    {/* {isAd && <HouseHeader />} */}
                    <Layout.Content><AppRoutes /></Layout.Content>
                    {isUserLoggedIn && !isCheckingToken && <Footer />}
                </Layout>
            </AppProvider>
        </ConfigProvider>
    );
}

export default App;
