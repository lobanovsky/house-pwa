import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { Avatar, Button, Layout } from 'antd';
import { RightOutlined, UserOutlined } from '@ant-design/icons';
import { getUser } from 'store/auth/selectors';
import { logout } from 'store/auth/reducer';
import './styles.scss';

export function HouseHeader() {
    const {
        firstName,
        name,
        userColor,
        isSuperAdmin
    } = useSelector(getUser);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Не показываем хедер, Если мы в профиле у себя
    if (location.pathname.endsWith('/profile')) {
        return <span />;
    }

    return (
        <Layout.Header>
            <div className="user-info">
                <Avatar style={{ backgroundColor: userColor }}><UserOutlined /></Avatar>
                <span className="user-name">
                    {firstName || name}
                    <RightOutlined />
                </span>
            </div>
            {isSuperAdmin && (
                <div className="admin-controls">
                    <Button
                      type="link"
                      style={{ padding: 0 }}
                      onClick={() => {
                            dispatch(logout());
                        }}
                    >
                        выйти
                    </Button>
                </div>
            )}
        </Layout.Header>
    );
}
