import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Avatar, Button, Typography } from 'antd';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';

import { getUser } from 'store/selectors/auth';
import './styles.scss';

export function UserProfile() {
    const user = useSelector(getUser);
    const { state } = useLocation();
    const navigate = useNavigate();

    const goBack = useCallback(() => {
        const prevPage = state.openedFrom || '/granted-accesses';
        navigate(prevPage);
    }, []);

    console.log(state);
    return (
        <div className="view my-profile">
            <div className="back-button-container">
                <Button type="link" size="large" onClick={goBack}><ArrowLeftOutlined /></Button>
            </div>

            <div className="profile-content">
                <div className="user-info">
                    <Avatar style={{ backgroundColor: user.userColor }}><UserOutlined /></Avatar>
                    <div className="user-name">
                        <Typography.Title level={5}>{user.name}</Typography.Title>
                    </div>
                </div>
            </div>
            <div>Здесь будет ваш профиль</div>
        </div>
    );
}
