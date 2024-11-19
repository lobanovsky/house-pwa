import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { EnumUserRequestRole } from 'backend';
import { GodIcon } from 'icons/god-outlined';
import { StaffIcon } from 'icons/staff';
import { GuardIcon } from 'icons/guard';

export const UserIconByRole: Record<EnumUserRequestRole, React.ReactNode> = {
    [EnumUserRequestRole.USER]: <UserOutlined />,
    [EnumUserRequestRole.STAFF_OPERATOR]: <GuardIcon />,
    [EnumUserRequestRole.SUPER_ADMIN]: <GodIcon />,
    [EnumUserRequestRole.STAFF_READ_ONLY]: <StaffIcon />,
    [EnumUserRequestRole.STAFF_ADMIN]: <StaffIcon />
};
