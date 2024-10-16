import React, { useCallback, useMemo, useState } from 'react';
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

    const [activeKey, setActiveKeys] = useState<string[]>(() => {
        const names = pathname.split('/');
        const selectedPage = names.length ? names[names.length - 1] : null;
        return selectedPage ? [`/${selectedPage}`] : [];
    });

    const onMenuItemClick: MenuProps['onClick'] = useCallback(({ key }: MenuInfo) => {
        setActiveKeys([key]);
        navigate(key);
    }, []);

    return (
        <Menu
          mode="horizontal"
          selectedKeys={activeKey}
          className="navigation-menu"
          onClick={onMenuItemClick}
          items={AppMenuItems}
        />
    );
}
