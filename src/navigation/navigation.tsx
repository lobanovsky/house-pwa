import React from 'react';
import { UserOutlined, DashboardOutlined, OrderedListOutlined } from '@ant-design/icons';
import { UserProfile } from '../views/user/profile';
import { GrantedAccesses } from '../views/user/accesses';
import { EnumUserRequestRole } from '../backend';
import { NavigationMenuItemType } from './types';
import { GateIcon } from '../icons/gate';
import { Counters } from '../views/user/counters';
import { Orders } from '../views/user/orders';

export const NavigationItems: NavigationMenuItemType[] = [
    {
        key: '/accesses',
        icon: <GateIcon className="gate-icon" />,
        title: 'Доступы',
        component: <GrantedAccesses />,
        roles: [EnumUserRequestRole.USER],
        availableForUser: (user) => !!user.ownerId
    },
    // {
    //     key: '/counters',
    //     icon: <DashboardOutlined />,
    //     title: 'Счётчики',
    //     component: <Counters />,
    // },
    // {
    //     key: '/orders',
    //     icon: <OrderedListOutlined />,
    //     title: 'Заявки',
    //     component: <Orders />,
    // },
    {
        key: '/profile',
        icon: <UserOutlined />,
        title: 'Профиль',
        component: <UserProfile />,
        roles: [
            EnumUserRequestRole.USER,
            EnumUserRequestRole.SUPER_ADMIN,
            EnumUserRequestRole.STAFF_ADMIN,
            EnumUserRequestRole.STAFF_READ_ONLY
        ]
    },
];
