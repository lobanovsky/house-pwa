import React from 'react';
import { MenuItemType } from 'antd/es/menu/interface';
import { LockOutlined, UserOutlined, CarOutlined } from '@ant-design/icons';
import { PermissionsConfig } from '../utils/types';
import { UserProfile } from '../views/user/profile';
import { Accesses } from '../views/user/accesses';
import { CarSearch } from '../views/guard/car-search';

export interface NavigationItemType extends MenuItemType {
    component: React.ReactNode,
    permissions?: PermissionsConfig
}

export const NavigationItems: NavigationItemType[] = [
    {
        key: '/user-profile',
        icon: <UserOutlined />,
        // title: 'Профиль',
        component: <UserProfile />,
        permissions: ['USER']
    },
    {
        key: '/accesses',
        icon: <LockOutlined />,
        // title: 'Доступы',
        component: <Accesses />,
        permissions: ['USER']
    },
    {
        key: '/car-search',
        icon: <CarOutlined />,
        // title: 'Поиск авто',
        component: <CarSearch />,
        permissions: ['GUARD']
    }
];
