import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Empty, Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getAccesses } from 'store/accesses/selectors';
import { AccessItem } from './access-item';
import { AreasPlaceholder } from './area-placeholder';
import './styles.scss';

export function GrantedAccesses() {
    const {
        data: accesses,
        isLoading
    } = useSelector(getAccesses);

    const hasTwoIconsItem = useMemo(() => accesses.some((access) => (access.areas || []).length > 1), [accesses.length]);
    return (
        <div className="view granted-accesses">
            <div className="content">
                <Typography.Title level={3}>Ваши доступы</Typography.Title>
                {!isLoading && !!accesses.length && <AreasPlaceholder />}
                {isLoading && <Spin indicator={<LoadingOutlined spin />} size="small" />}
                <div className={
                    `access-list ${!accesses.length ? 'empty' : ''} ${accesses.length && hasTwoIconsItem ? '' : 'single-area'}`
                }
                >
                    {
                        accesses.length ? accesses.map((access) => (
                                <AccessItem
                                  key={access.accessId}
                                  doubleAreaWidth={hasTwoIconsItem}
                                  access={access}
                                />
                            ))
                            : (isLoading ? '' : (
                                <div className="empty-placeholder">
                                    <Empty description="Нет доступов" />
                                </div>
                            ))
                    }
                </div>

            </div>
        </div>
    );
}
