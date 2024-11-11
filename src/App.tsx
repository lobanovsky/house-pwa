import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { App as AppProvider, ConfigProvider, Layout } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import './backend/axios';
import NotificationsProvider from './global/NotificationsProvider';
import { AppRoutes } from './navigation/routes';
import { HouseMenu } from './layout/footer';
import './App.scss';

import { StoreState } from './store';
import { getUserData } from './views/auth/login/helpers';
import { logout } from './store/reducers/auth';
import { HouseHeader } from './layout/header';

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
                        {isUserLoggedIn && <HouseHeader />}
                        <Layout.Content><AppRoutes /></Layout.Content>
                        <HouseMenu />
                    </Layout>
                </BrowserRouter>
            </AppProvider>
        </ConfigProvider>
    );
}

export default App;
