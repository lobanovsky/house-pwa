import { ArrowDownOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { MenuItemType } from 'antd/es/menu/interface';
import { PermissionsConfig } from '../utils/types';
import { UserProfile } from '../views/user/profile';
import { Accesses } from '../views/user/accesses';
import { CarIcon } from '../icons/car';
import { CarSearch } from '../views/guard/car-search';

export interface NavigationItemType extends MenuItemType {
    component: React.ReactNode,
    permissions?: PermissionsConfig
}

export const NavigationItems: NavigationItemType[] = [
    {
        key: '/user-profile',
        icon: <UserOutlined />,
        title: 'Профиль',
        component: <UserProfile />,
        permissions: ['USER']
    },
    {
        key: '/accesses',
        icon: <ArrowDownOutlined />,
        title: 'Доступы',
        component: <Accesses />,
        permissions: ['USER']
    },
    {
        key: '/car-search',
        icon: <CarIcon />,
        title: 'Поиск авто',
        component: <CarSearch />,
        permissions: ['GUARD']
    }
];
