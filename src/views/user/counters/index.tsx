import React from 'react';
import { Typography } from 'antd';

export function Counters() {
    return (
        <div className="view counters">
            <Typography.Title level={4}>Счётчики</Typography.Title>
            <div style={{ padding: '2em 1em' }}>Здесь можно будет передавать показания счётчиков</div>
        </div>
    );
}
