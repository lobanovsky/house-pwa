import React, { useCallback } from 'react';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { Avatar, Spin, Typography } from 'antd';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { getUser } from 'store/auth/selectors';
import { getUserProperty } from 'store/property/selectors';
import './styles.scss';

export function UserProfile() {
    const user = useSelector(getUser);
    const { state } = useLocation();
    const {
        data: property,
        isLoading
    } = useSelector(getUserProperty);

    return (
        <div className="view my-profile">
            <div className="profile-content">
                <div className="user-info">
                    <Avatar style={{ backgroundColor: user.userColor }}><UserOutlined /></Avatar>
                    <div className="user-name">
                        <Typography.Title level={5}>{user.name}</Typography.Title>
                    </div>
                </div>
                {user.ownerId && (
                    <div className="user-property">
                        {isLoading && <Spin indicator={<LoadingOutlined spin />} size="small" />}
                        <div className="property-list">
                            {
                                property.length ? property.map((prop) => (
                                        <div key={prop.id} className="property-item">
                                            {prop.typeDescription}
                                            <span className="prop-number">{prop.number}</span>
                                            <div className="address">{prop.street}</div>
                                        </div>
                                    ))
                                    : (isLoading ? '' : 'нет собственности')
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
