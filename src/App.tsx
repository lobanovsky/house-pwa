import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { App as AppProvider, ConfigProvider, Layout } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import './backend/axios';
import NotificationsProvider from './global/NotificationsProvider';
import { AppRoutes } from './navigation/routes';
import { HouseMenu } from './navigation/menu';
import './App.scss';

import { StoreState } from './store';
import { getUserData } from './views/auth/login/helpers';
import { logout } from './store/reducers/auth';

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
                        <Layout.Content><AppRoutes /></Layout.Content>
                        <Layout.Footer>
                            <HouseMenu />
                        </Layout.Footer>
                    </Layout>
                </BrowserRouter>
            </AppProvider>
        </ConfigProvider>
    );
}

export default App;
