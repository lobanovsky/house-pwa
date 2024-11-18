import React from 'react';
import { Typography } from 'antd';

export function Orders() {
    return (
        <div className="view orders" style={{ background: 'aliceblue' }}>
            <Typography.Title level={4}>Заявки</Typography.Title>
            <div style={{ padding: '2em 1em' }}>А здесь можно оставлять заявки на обслуживание квартиры!</div>
        </div>
    );
}
