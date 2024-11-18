import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Layout, Menu, MenuProps } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { MenuItemType } from 'antd/es/menu/interface';

import { NavigationItems } from 'navigation/navigation';
import { createNavigationForUser } from 'navigation/utils';
import { getAuth } from 'store/auth/selectors';
import './styles.scss';
import { getUserDefaultPage } from '../../views/auth/login/helpers';

const AppMenuItems: MenuItemType[] = NavigationItems
    .filter(({ hideInMenu = false }) => !hideInMenu)
    .map(
        ({
             component,
             roles,
             hideInMenu,
             ...menuItemConfig
         }) => ({
            ...menuItemConfig,
            label: menuItemConfig.title
        })
    );

export function Footer() {
    const navigate = useNavigate();
    const { pathname = '' } = useLocation();
    const {
        isCheckingToken,
        isUserLoggedIn,
        user
    } = useSelector(getAuth);

    const [activeKey, setActiveKeys] = useState<string[]>(() => {
        const { path: defaultPage } = getUserDefaultPage(user, pathname);
        console.log(`%c FOOTER: Sel page from pathname: [${defaultPage}], pathname [${pathname}]`, 'color: purple;');
        return [defaultPage];
    });

    const grantedNavigation = useMemo<MenuItemType[]>(
        // @ts-ignore
        () => (!(user.roles || []).length ? [] : createNavigationForUser(AppMenuItems, user)),
        [user.roles.length]
    );

    const onMenuItemClick: MenuProps['onClick'] = useCallback(({ key }: MenuInfo) => {
        setActiveKeys([key]);
        navigate(key);
    }, []);

    useEffect(() => {
        const selectedRoute = grantedNavigation.find(({ key }) => key === pathname);
        if (selectedRoute) {
            setActiveKeys([selectedRoute.key as string]);
            // navigate(key);
        }
    }, [pathname, grantedNavigation.length]);

    // Нет смысла выводить меню, если нам доступен только 1 пункт
    // он и откроется по умолчанию
    if (grantedNavigation.length < 2) {
        return <span />;
    }

    return (
        <Layout.Footer>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={activeKey}
              selectedKeys={activeKey}
              className="navigation-menu"
              onClick={onMenuItemClick}
              items={grantedNavigation}
            />
        </Layout.Footer>
    );
}
