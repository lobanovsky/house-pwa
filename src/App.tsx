import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { App as AppProvider, ConfigProvider, Layout } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import './backend/axios';
import NotificationsProvider from './global/NotificationsProvider';
import { AppRoutes } from './navigation/routes';
import './App.scss';
import { HouseMenu } from './navigation/menu';

function App() {
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
