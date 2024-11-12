import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Skeleton, Typography } from 'antd';
import { AccessResponse, AccessService } from 'backend';
import { useLoading } from 'hooks/use-loading';
import { getUser } from 'store/selectors/auth';
import { showError } from 'utils/notifications';
import { AccessItem } from './access-item';
import './styles.scss';

export function GrantedAccesses() {
    const user = useSelector(getUser);

    const [loading, showLoading, hideLoading] = useLoading();
    const [accesses, setAccesses] = useState<AccessResponse[]>([]);

    useEffect(() => {
        if (user.ownerId) {
            showLoading();
            AccessService.findByOwner({ ownerId: user.ownerId })
                .then((resp) => {
                    hideLoading();
                    setAccesses(resp);
                })
                .catch((e) => {
                    hideLoading();
                    showError('Не удалось загрузить список доступов');
                    console.error(e);
                });
        }
    }, []);
    return (
        <div className="view granted-accesses">
            <Typography.Title level={4}>Доступы</Typography.Title>
            {loading ? <Skeleton active /> : (
                <div className="access-list">
                    {(accesses || []).length ? (accesses || []).map((access) => <AccessItem access={access} />) : 'нет доступов'}
                </div>
            )}

        </div>
    );
}
