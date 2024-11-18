import React from 'react';
import { EnumUserRequestRole } from 'backend';
import { PathRouteProps } from 'react-router/dist/lib/components';
import { IUserData } from '../utils/types';

export interface RouteConfig {
  key: string | number;
  title: string;
  roles?: EnumUserRequestRole[],
  component?: React.ReactNode;
}

export interface PrivateRouteProps extends PathRouteProps {
  roles?: EnumUserRequestRole[]
}

export interface NavigationItemConfig {
  key: string | number;
  roles?: EnumUserRequestRole[],
  icon?: React.ReactNode,
  label?: React.ReactNode,
}

export interface NavigationItemType extends RouteConfig, NavigationItemConfig {
  hidden?: boolean;
  hideInMenu?: boolean;
  availableForUser?: (user: IUserData) => boolean
}

export interface NavigationMenuItemType extends NavigationItemType {
  children?: NavigationItemType[];
}

export type NavigationType = Array<NavigationMenuItemType>;
