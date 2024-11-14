import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { App as AppProvider, ConfigProvider, Layout } from 'antd';
import ruRU from 'antd/locale/ru_RU';

import './backend/axios';
import NotificationsProvider from 'global/NotificationsProvider';
import { Footer } from 'layout/footer';
import { HouseHeader } from 'layout/header';
import { AppRoutes } from 'navigation/routes';
import { StoreState } from 'store';
import { logout } from 'store/auth/reducer';
import { getUserData } from 'views/auth/login/helpers';

import './App.scss';

function App() {
    const dispatch = useDispatch();
    const {
        user,
        isUserLoggedIn
    } = useSelector((state: StoreState) => state.auth);

    useEffect(() => {
        if (isUserLoggedIn) {
            getUserData(user, dispatch);
        } else {
            dispatch(logout());
        }
    }, []);

    return (
        <ConfigProvider locale={ruRU}>
            <AppProvider>
                <NotificationsProvider />
                <BrowserRouter>
                    <Layout>
                        {/* {isAd && <HouseHeader />} */}
                        <Layout.Content><AppRoutes /></Layout.Content>
                        <Footer />
                    </Layout>
                </BrowserRouter>
            </AppProvider>
        </ConfigProvider>
    );
}

export default App;
