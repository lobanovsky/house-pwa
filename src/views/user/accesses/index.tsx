import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Spin, Typography } from 'antd';
import { LoadingOutlined, QuestionOutlined } from '@ant-design/icons';
import { ParkingFilledIcon } from 'icons/parking_filled';
import { TreeFilledIcon } from 'icons/tree-filled';
import { getAccesses } from 'store/accesses/selectors';
import { AccessItem } from './access-item';
import './styles.scss';
import { AreasInfo } from './access-item/constants';
import { AreasPlaceholder } from './area-placeholder';

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
                <AreasPlaceholder />
                {isLoading && <Spin indicator={<LoadingOutlined spin />} size="small" />}
                <div className={`access-list ${hasTwoIconsItem ? '' : 'single-area'}`}>
                    {
                        accesses.length ? accesses.map((access) => (
                                <AccessItem
                                  key={access.accessId}
                                  doubleAreaWidth={hasTwoIconsItem}
                                  access={access}
                                />
                            ))
                            : (isLoading ? '' : 'нет доступов')
                    }
                </div>

            </div>
        </div>
    );
}
