import React from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from 'store';
import Loading from 'components/loading';
import AccessDeniedPage from 'views/auth/access-denied-page';
import LoginView from 'views/auth/login';
import { userHasPermissions } from '../../utils';
import { EnumUserRequestRole } from '../../../backend';

export function PrivatePage({
                              children,
                              roles = [],
                              path = ''
                            }: { children: React.ReactNode, path?: string, roles?: EnumUserRequestRole[] }): JSX.Element {
  const {
    isLoggingIn,
    isCheckingToken,
    isUserLoggedIn,
    user
  } = useSelector((state: StoreState) => state.auth);

  let element = <Loading />;

  if (!isCheckingToken) {
    if (!isUserLoggedIn) {
      element = <LoginView />;
    } else if (roles.length) {
      const userHasRoles = userHasPermissions(roles, user.roles);
      // @ts-ignore
      element = userHasRoles ? children : <AccessDeniedPage />;
    } else {
      // @ts-ignore
      element = children;
    }
  }

  return element;
}
