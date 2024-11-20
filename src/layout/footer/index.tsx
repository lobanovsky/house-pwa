import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Layout, Menu, MenuProps } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { MenuItemType } from 'antd/es/menu/interface';
import { NavigationItems } from 'navigation/navigation';
import { createNavigationForUser } from 'navigation/utils';
import { getAuth } from 'store/auth/selectors';
import { getUserDefaultPage } from 'views/auth/login/helpers';
import './styles.scss';

export function Footer() {
    const navigate = useNavigate();
    const { pathname = '' } = useLocation();
    const {
        user
    } = useSelector(getAuth);

    const [activeKey, setActiveKeys] = useState<string[]>(() => {
        const { path: defaultPage } = getUserDefaultPage(user, pathname);
        return [defaultPage];
    });

    const grantedNavigation = useMemo<MenuItemType[]>(
        // @ts-ignore
        () => {
            // @ts-ignore
            const navigation = (!(user.roles || []).length ? [] : createNavigationForUser(NavigationItems, user));

            return navigation.map(
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
        },
        [user.roles.join(','), user.id]
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
