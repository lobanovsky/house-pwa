import { EnumUserRequestRole } from 'backend';
import { NavigationType } from './types';

export type IMenuItem = { key: string, label?: string, icon?: string };
export type MenuItemType = IMenuItem & { children?: IMenuItem[] };

export const getNavigationItemByPathname = (pathname: string, item: MenuItemType = {
    key: '',
    children: []
}): MenuItemType | null => {
    let result = null;

    if (pathname === item.key) {
        result = item;
        // @ts-ignore
    } else if ((item.children || []).length) {
        // @ts-ignore
        const children = item.children || [];
        for (let i = 0; i <= children.length && !result; i++) {
            result = getNavigationItemByPathname(pathname, children[i]);
        }
    }

    return result;
};

export const userHasPermissions = (roles: EnumUserRequestRole[], userRoles: EnumUserRequestRole[]) => !roles.length
    || userRoles.includes(EnumUserRequestRole.SUPER_ADMIN)
    || roles.some((requiredRole) => userRoles.includes(requiredRole));

export const filterNavigationByUserRoles = (navigationItems: NavigationType, userRoles: EnumUserRequestRole[]): NavigationType => {
    const result: NavigationType = [];
    navigationItems.forEach((item) => {
        if (Array.isArray(item.children)) {
            const grantedChildren = item.children.filter(({ roles = [] }) => userHasPermissions(roles, userRoles));
            if (grantedChildren.length) {
                result.push({
                    ...item,
                    children: grantedChildren
                });
            }
        } else if (userHasPermissions(item.roles || [], userRoles)) {
            result.push(item);
        }
    });

    return result;
};
