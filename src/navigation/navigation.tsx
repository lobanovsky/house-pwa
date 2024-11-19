import React from 'react';
import { UserProfile } from '../views/auth/profile';
import { GrantedAccesses } from '../views/user/accesses';
import { EnumUserRequestRole } from '../backend';
import { NavigationMenuItemType } from './types';
import { GateIcon } from '../icons/gate';
import { CarSearch } from '../views/guard/car-search';
import { CarIcon } from '../icons/car';
import { UserFilledIcon } from '../icons/user-filled';

export const NavigationItems: NavigationMenuItemType[] = [
    {
        key: '/accesses',
        icon: <GateIcon className="gate-icon" />,
        title: 'Доступы',
        component: <GrantedAccesses />,
        roles: [EnumUserRequestRole.USER],
        // availableForUser: (user) => !!user.ownerId
    },
    {
        key: '/car-search',
        icon: <CarIcon />,
        title: 'Авто',
        // todo заменить роль
        roles: [EnumUserRequestRole.USER],
        component: <CarSearch />,
    },
    {
        key: '/profile',
        icon: <UserFilledIcon />,
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
