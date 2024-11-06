import React from 'react';
import { MenuItemType } from 'antd/es/menu/interface';
import { CarOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { UserProfile } from '../views/user/profile';
import { Accesses } from '../views/user/accesses';
import { CarSearch } from '../views/guard/car-search';
import { EnumUserRequestRole } from '../backend';

export interface NavigationItemType extends MenuItemType {
    component: React.ReactNode,
    roles?: EnumUserRequestRole[]
}

export const NavigationItems: NavigationItemType[] = [
    {
        key: '/user-profile',
        icon: <UserOutlined />,
        // title: 'Профиль',
        component: <UserProfile />,
        roles: [EnumUserRequestRole.USER]
    },
    {
        key: '/accesses',
        icon: <LockOutlined />,
        // title: 'Доступы',
        component: <Accesses />,
        roles: [EnumUserRequestRole.USER]
    },
    {
        key: '/car-search',
        icon: <CarOutlined />,
        // title: 'Поиск авто',
        component: <CarSearch />,
        roles: [EnumUserRequestRole.STAFF_READ_ONLY, EnumUserRequestRole.SUPER_ADMIN]
    }
];
