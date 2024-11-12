import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ParkingFilledIcon } from 'icons/parking_filled';
import { TreeFilledIcon } from 'icons/tree-filled';
import { getAccesses } from 'store/accesses/selectors';
import { AccessItem } from './access-item';
import './styles.scss';

export function GrantedAccesses() {
    const {
        data: accesses,
        isLoading
    } = useSelector(getAccesses);

    const hasTwoIconsItem = useMemo(() => accesses.some((access) => (access.areas || []).length > 1), [accesses.length]);
    return (
        <div className="view granted-accesses">
            <Typography.Title level={5}>Ваши доступы</Typography.Title>
            {isLoading && <Spin indicator={<LoadingOutlined spin />} size="small" />}
            <div className={`access-list ${hasTwoIconsItem ? '' : 'single-area'}`}>
                {
                    accesses.length ? accesses.map((access) => <AccessItem key={access.accessId} access={access} />)
                        : (isLoading ? '' : 'нет доступов')
                }
            </div>
            <div className="area-icons-placeholder">
                {/* todo брать арии из справочника */}
                *
                <div className="area parking">
                    <ParkingFilledIcon />
                    <span className="icon-label"> - Паркинг</span>
                </div>
                <div className="area home">
                    <TreeFilledIcon />
                    <span className="icon-label"> - Дворовая территория</span>
                </div>
            </div>
        </div>
    );
}
