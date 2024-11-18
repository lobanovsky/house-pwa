import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { App as AppProvider, ConfigProvider, Layout } from 'antd';
import ruRU from 'antd/locale/ru_RU';

import './backend/axios';
import NotificationsProvider from 'global/NotificationsProvider';
import { Footer } from 'layout/footer';
import { AppRoutes } from 'navigation/routes';
import { logout } from 'store/auth/reducer';
import { getUserData } from 'views/auth/login/helpers';
import { getAuth } from './store/auth/selectors';
import { AppTheme } from './theme';
import './App.scss';

function App() {
    // @ts-ignore
    let resizeInterval = null;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const {
        user,
        isUserLoggedIn,
        isCheckingToken
    } = useSelector(getAuth);

    const [appHeight, setAppHeight] = useState(0);

    const updateAppHeight = () => {
        if (window.innerHeight !== appHeight) {
            setAppHeight(window.innerHeight);
        }
    };

    useEffect(() => {
        if (isUserLoggedIn) {
            getUserData(user, navigate, pathname);
        } else {
            dispatch(logout());
        }

        resizeInterval = setInterval(() => {
            window.scrollTo({
                top: 0
            });
            updateAppHeight();
        }, 500);

        window.addEventListener('resize', updateAppHeight);

        return () => {
            // @ts-ignore
            clearInterval(resizeInterval);
            window.removeEventListener('resize', updateAppHeight);
        };
    }, []);

    return (
        <ConfigProvider locale={ruRU} theme={AppTheme}>

            <AppProvider>
                <NotificationsProvider />
                <Layout>
                    <Layout.Content>
                        <div style={{ color: 'red', padding: 10 }}>
height:
{appHeight}
{' '}
px
                        </div>
                        <AppRoutes />
                    </Layout.Content>
                    {isUserLoggedIn && !isCheckingToken && <Footer />}
                </Layout>
            </AppProvider>
        </ConfigProvider>
    );
}

export default App;
