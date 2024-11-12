import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { UserProfile } from '../views/user/profile';
import { GrantedAccesses } from '../views/user/accesses';
import { EnumUserRequestRole } from '../backend';
import { NavigationMenuItemType } from './types';

export const NavigationItems: NavigationMenuItemType[] = [
    {
        key: '/granted-accesses',
        icon: <LockOutlined />,
        title: 'Доступы',
        component: <GrantedAccesses />,
        roles: [EnumUserRequestRole.USER],
        availableForUser: (user) => !!user.ownerId
    },
    {
        key: '/user-profile',
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
