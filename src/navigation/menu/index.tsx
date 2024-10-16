import React, { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Menu, MenuProps } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { MenuItemType } from 'antd/es/menu/interface';
import { NavigationItems } from '../navigation';
import './styles.scss';

const AppMenuItems: MenuItemType[] = NavigationItems.map(
    ({
         component,
         permissions,
         ...menuItemConfig
     }) => menuItemConfig
);

export function HouseMenu() {
    const navigate = useNavigate();
    const { pathname = '' } = useLocation();

    const defaultSelectedPages: string[] = useMemo(() => {
        const names = pathname.split('/');
        const selectedPage = names.length ? names[names.length - 1] : null;
        console.log(`%cSelected page: [${selectedPage}]`, 'color:blue');
        return selectedPage ? [selectedPage] : [];
    }, [pathname]);

    const onMenuItemClick: MenuProps['onClick'] = useCallback((selectedItem: MenuInfo) => {
        navigate(selectedItem.key);
    }, []);

    return (
        <Menu
          mode="horizontal"
          defaultSelectedKeys={defaultSelectedPages}
          className="navigation-menu"
          onClick={onMenuItemClick}
          items={AppMenuItems}
        />
    );
}
