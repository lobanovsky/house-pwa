import React from 'react';
import { EnumUserRequestRole } from 'backend';

export interface RouteConfig {
  key: string | number;
  title: string;
  roles?: EnumUserRequestRole[],
  component?: React.ReactNode;
}

export interface NavigationItemConfig {
  key: string | number;
  roles?: EnumUserRequestRole[],
  icon?: React.ReactNode,
  label?: React.ReactNode,
}

export interface NavigationItemType extends RouteConfig, NavigationItemConfig {
  hidden?: boolean;
}

export interface NavigationMenuItemType extends NavigationItemType {
  children?: NavigationItemType[];
  hideInMenu?: boolean;
}

// export interface NavigationSubmenuItemType extends NavigationItemConfig {
//   children: NavigationItemType[];
// }

export type NavigationType = Array<NavigationMenuItemType>;
