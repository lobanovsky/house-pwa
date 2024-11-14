import React, { useCallback } from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Spin, Typography } from 'antd';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { getUser } from 'store/auth/selectors';
import { getUserProperty } from 'store/property/selectors';
import './styles.scss';
import { PropertyItem } from './property-item';
import { logout } from '../../../store/auth/reducer';

export function UserProfile() {
    const user = useSelector(getUser);
    const dispatch = useDispatch();

    const {
        data: property,
        isLoading
    } = useSelector(getUserProperty);

    const doLogout = useCallback(() => {
        dispatch(logout());
    }, []);

    return (
        <div className="view my-profile">
            <div className="profile-content">
                <div className="user-info">
                    <Avatar size="large" style={{ backgroundColor: user.userColor }}><UserOutlined /></Avatar>
                    <div className="user-name">
                        <Typography.Title level={4}>{user.name}</Typography.Title>
                    </div>
                </div>
                {user.ownerId && (
                    <div className="user-property">
                        <Typography.Title level={5}>&nbsp;Собственность</Typography.Title>
                        {isLoading && <Spin indicator={<LoadingOutlined spin />} size="small" />}
                        <div className="property-list">
                            {
                                property.length ? property.map((prop) => (
                                        <PropertyItem property={prop} key={prop.id} />
                                    ))
                                    : (isLoading ? '' : 'нет собственности')
                            }
                        </div>
                    </div>
                )}
                <div className="logout-btn-container">
                    <Button
                      danger
                      type="text"
                      onClick={doLogout}
                    >
                        выйти из учётной записи
                    </Button>
                </div>

            </div>
            <div className="copyright">
                сделано в
                {' '}
                <Button type="link" size="small" href="https://lobanovsky.ru">Бюро Лобановского</Button>
                ♡
            </div>
        </div>
    );
}
