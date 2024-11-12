import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { UserProfile } from '../views/user/profile';
import { GrantedAccesses } from '../views/user/accesses';
import { EnumUserRequestRole } from '../backend';
import { NavigationMenuItemType } from './types';

export const NavigationItems: NavigationMenuItemType[] = [
    {
        key: '/user-profile',
        icon: <UserOutlined />,
        hideInMenu: true,
        // профиль в меню не выводим - он откроется по нажатию на свою аватарку
         title: 'Профиль',
        component: <UserProfile />,
        roles: [EnumUserRequestRole.USER],
        availableForUser: (user) => !!user.ownerId
    },
    {
        key: '/granted-accesses',
        icon: <LockOutlined />,
        title: 'Доступы',
        component: <GrantedAccesses />,
        roles: [EnumUserRequestRole.USER]
    },
    // {
    //     key: '/car-search',
    //     icon: <CarOutlined />,
    //     // title: 'Поиск авто',
    //     component: <CarSearch />,
    //     roles: [EnumUserRequestRole.STAFF_READ_ONLY, EnumUserRequestRole.SUPER_ADMIN]
    // }
];
