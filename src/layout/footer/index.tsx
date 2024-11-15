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
        const names = pathname.split('/')
            .filter((path) => !!path);

        const selectedPage = names.length ? names[names.length - 1] : '';
        let defaultRoute = selectedPage;
        if (!selectedPage && !isCheckingToken && isUserLoggedIn) {
            defaultRoute = user.ownerId ? '/granted-accesses' : '/user-profile';
        }

        console.log(`%c Sel page from pathname: [${selectedPage}], default route: [${defaultRoute}]`, 'color: red;');
        return [`/${defaultRoute}`];
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
