import { EnumUserRequestRole } from 'backend';
import { NavigationMenuItemType, NavigationType } from './types';
import { IUserData } from '../utils/types';

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

const isAvailableNavigationItem = (menuItemConfig: NavigationMenuItemType, user: IUserData) => {
    const {
        roles = [],
        availableForUser
    } = menuItemConfig;

    const hasRoles = userHasPermissions(roles, user.roles);
    return (!availableForUser || availableForUser(user)) && hasRoles;
};

export const createNavigationForUser = (navigationItems: NavigationType, user: IUserData): NavigationType => navigationItems.filter(
    (menuItem) => isAvailableNavigationItem(menuItem, user)
);
