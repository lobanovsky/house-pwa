import React from 'react';
import {App as AppProvider, Button, ConfigProvider, Layout} from "antd";
import ruRU from "antd/locale/ru_RU";
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";

import './backend/axios';
import Buildings from "./views/buildings";
import './App.scss';

function App() {
    return (
        <ConfigProvider locale={ruRU}>
            <AppProvider>
                <div className="App">
                    <BrowserRouter>
                        <Layout>
                            <Layout.Content>
                                <Link to='/home'><Button type='link'>На главную</Button></Link>
                                <Routes>
                                    <Route
                                        path='/buildings'
                                        element={<Buildings/>}
                                    />
                                    <Route
                                        path='/home'
                                        element={<div className='home view'>
                                            Главная страница
                                            <div>
                                                <Link to='/buildings'><Button>Посмотреть здания</Button></Link>
                                            </div>
                                        </div>}
                                    />
                                    <Route
                                        path='*'
                                        element={<Navigate
                                            replace
                                            to='/home'
                                        />}
                                    />
                                </Routes>
                            </Layout.Content>

                        </Layout>
                    </BrowserRouter>
                </div>
            </AppProvider>
        </ConfigProvider>
    );
}

export default App;
