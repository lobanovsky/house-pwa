import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App as AppProvider, ConfigProvider, Layout } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import './backend/axios';
import NotificationsProvider from './global/NotificationsProvider';
import { CarSearch } from './views/search';
import './App.scss';

function App() {
    return (
        <ConfigProvider locale={ruRU}>
            <AppProvider>
                <NotificationsProvider />
                <div className="App">
                    <BrowserRouter>
                        <Layout>
                            <Layout.Content>
                                <Routes>
                                    <Route
                                      index
                                      path="/search"
                                      element={<CarSearch />}
                                    />
                                    <Route
                                      path="*"
                                      element={(
<Navigate
  replace
  to="/search"
/>
)}
                                    />
                                </Routes>
                            </Layout.Content>
                            <Layout.Footer>
                                © 2020-2024 Бюро Лобановского
                            </Layout.Footer>
                        </Layout>
                    </BrowserRouter>
                </div>
            </AppProvider>
        </ConfigProvider>
    );
}

export default App;
