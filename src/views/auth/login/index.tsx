import React, { ChangeEvent, KeyboardEvent, useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Input, Skeleton } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { AuthorizationService, LoginRequest } from 'backend';
import { loginStarted } from 'store/auth/reducer';
import { EmailRegex } from 'utils/constants';
import { showError } from 'utils/notifications';
import { AuthData, IUserData, ServerError } from 'utils/types';

import { getUserData } from './helpers';
import './styles.scss';

function Login() {
    const dispatch = useDispatch();
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
    const [credentials, setCredentials] = useState<LoginRequest>({
        email: '',
        password: ''
    });

    const formValidState = useMemo(() => ({
        email: EmailRegex.test(credentials.email || ''),
        password: !!(credentials.password || '').length
    }), [credentials.email, credentials.password]);

    const doLogin = useCallback((inputCredentials: LoginRequest, onFinish: any) => {
        // @ts-ignore
        dispatch(loginStarted());
        AuthorizationService.token({ body: inputCredentials })
            .then((userProfile) => {
                onFinish(true, userProfile);
            })
            .catch((error) => {
                onFinish(false, error);
            });
    }, []);

    const loginCallback = useCallback(() => {
        if (!credentials.password || !credentials.email) {
            return;
        }
        setIsLoggingIn(true);
        doLogin(credentials, (isSuccess: boolean, loginData: AuthData | ServerError) => {
            // setIsLoggingIn(false);
            if (isSuccess) {
                getUserData(loginData as IUserData, dispatch);
            } else {
                setIsLoggingIn(false);
                const serverError = loginData as ServerError;
                // В случае ошибки в data будет объект ошибки от бэка
                const { response: { data: error = '' } = { data: '' } } = serverError;
                showError('Не удалось авторизоваться', error as ServerError);
            }
        });
    }, [credentials.password, credentials.email]);

    const onChangeEmail = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            email: value
        }));
    }, []);

    const onChangePassword = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        const pwdWithoutSpaces = value.replace(/\s+/g, '');
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            password: pwdWithoutSpaces
        }));
    }, []);

    const onLoginFormClick = useCallback((ev: KeyboardEvent) => {
        const isEnterKeyPressed = ev.keyCode === 13 || String(ev.key)
            .toLowerCase() === 'enter';
        if (isEnterKeyPressed) {
            loginCallback();
        }
    }, [loginCallback]);

    return (
        <div className="view login">
            <Card
              title="Вход"
              onKeyDown={onLoginFormClick}
            >
                {isLoggingIn ? <Skeleton.Input active /> : (
                    <Input
                      placeholder="Email"
                      className={!formValidState.email ? 'invalid' : ''}
                      value={credentials.email}
                      onChange={onChangeEmail}
                      prefix={<UserOutlined />}
                    />
                )}

                {isLoggingIn ? <Skeleton.Input active /> : (
                    <Input
                      placeholder="Пароль"
                      className={!formValidState.password ? 'invalid' : ''}
                      type="password"
                      value={credentials.password}
                      onChange={onChangePassword}
                      prefix={<LockOutlined />}
                    />
                )}
                <div className="login-button-container">
                    {isLoggingIn ? <Skeleton.Button active /> : (
                        <Button
                          disabled={!formValidState.email || !formValidState.password}
                          type="primary"
                          onClick={loginCallback}
                        >
                            Войти
                        </Button>
                    )}

                </div>
            </Card>
        </div>
    );
}

export default Login;
