import { Avatar } from 'antd';
import { QuestionOutlined } from '@ant-design/icons';
import React from 'react';
import { AreasInfo } from '../access-item/constants';
import './styles.scss';

export function AreasPlaceholder() {
    // todo взять арии из справочника
    return (
<div className="area-icons-placeholder">
        {/* <div className="sign">{'\u2217'}</div> */}
        {[1, 2].map((areaId) => {
            const areaInfo = AreasInfo[String(areaId)];
            const isParking = areaId === 2;
            return (
                <div className="area" key={areaId}>
                    <Avatar
                      size="small"
                      icon={areaInfo?.icon || <QuestionOutlined />}
                      style={{ backgroundColor: areaInfo?.colorGrayed || 'gray' }}
                    />
                    <span className="dash">-</span>
                    <span className="label">{isParking ? 'Паркинг' : areaInfo.title}</span>
                </div>
            );
        })}
</div>
);
}
