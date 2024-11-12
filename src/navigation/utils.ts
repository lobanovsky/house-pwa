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

// eslint-disable-next-line max-len
const isAvailableNavigationItem = ({
                                       roles = [],
                                       availableForUser
                                   }: NavigationMenuItemType, user: IUserData) => (
    !availableForUser || availableForUser(user)) && userHasPermissions(roles, user.roles);

export const createNavigationForUser = (navigationItems: NavigationType, user: IUserData): NavigationType => {
    const result: NavigationType = [];

    navigationItems.forEach((menuItem) => {
        if (Array.isArray(menuItem.children)) {
            const grantedChildren: NavigationMenuItemType[] = menuItem.children
                .filter((childMenuItem) => isAvailableNavigationItem(childMenuItem, user));

            if (grantedChildren.length) {
                result.push({
                    ...menuItem,
                    children: grantedChildren.map(({
                                                       availableForUser,
                                                       ...menuItemConfig
                                                   }) => menuItemConfig)
                });
            }
        } else if (isAvailableNavigationItem(menuItem, user)) {
            const {
                availableForUser,
                ...menuItemConfig
            } = menuItem;
            result.push(menuItemConfig);
        }
    });

    return result;
};
