import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getAccesses } from 'store/accesses/selectors';
import { AccessItem } from './access-item';
import './styles.scss';

export function GrantedAccesses() {
    const { data: accesses, isLoading } = useSelector(getAccesses);

    return (
        <div className="view granted-accesses">
            {/* <Typography.Title level={5}>Доступы</Typography.Title> */}
            {isLoading && <Spin indicator={<LoadingOutlined spin />} size="small" />}
            <div className="access-list">
                {
                    accesses.length ? accesses.map((access) => <AccessItem key={access.accessId} access={access} />)
                        : (isLoading ? '' : 'нет доступов')
                }
            </div>
        </div>
    );
}
