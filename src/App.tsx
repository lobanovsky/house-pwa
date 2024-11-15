import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { App as AppProvider, ConfigProvider, Layout } from 'antd';
import ruRU from 'antd/locale/ru_RU';

import './backend/axios';
import NotificationsProvider from 'global/NotificationsProvider';
import { Footer } from 'layout/footer';
import { AppRoutes } from 'navigation/routes';
import { StoreState } from 'store';
import { logout } from 'store/auth/reducer';
import { getUserData } from 'views/auth/login/helpers';
import { AppTheme } from './theme';
import './App.scss';

function App() {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const {
        user,
        isUserLoggedIn
    } = useSelector((state: StoreState) => state.auth);

    useEffect(() => {
        if (isUserLoggedIn) {
            getUserData(user, dispatch, (loggedUser) => {
                // let redirectUrl = pathname;
                // if (!pathname) {
                //     redirectUrl = loggedUser.ownerId ? 'granted-accesses' : 'user-profile';
                // } else if (pathname.endsWith('granted-accesses') && !loggedUser.ownerId) {
                //     redirectUrl = 'user-profile';
                // }
                //
                // navigate(`/${redirectUrl}`);
            });
        } else {
            dispatch(logout());
        }
    }, []);

    return (
        <ConfigProvider locale={ruRU} theme={AppTheme}>
            <AppProvider>
                <NotificationsProvider />
                <Layout>
                    {/* {isAd && <HouseHeader />} */}
                    <Layout.Content><AppRoutes /></Layout.Content>
                    {isUserLoggedIn && <Footer />}

                </Layout>
            </AppProvider>
        </ConfigProvider>
    );
}

export default App;
