import React from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from 'store';
import Loading from 'components/loading';
import AccessDeniedPage from 'views/auth/access-denied-page';
import LoginView from 'views/auth/login';
import { userHasPermissions } from '../../utils';
import { EnumUserRequestRole } from '../../../backend';
import { IUserData } from '../../../utils/types';

interface PrivatePageProps {
    children: React.ReactNode,
    roles?: EnumUserRequestRole[],
    availableForUser?: (user: IUserData) => boolean
}

export function PrivatePage({
                                children,
    availableForUser = undefined,
                                roles = []
                            }: PrivatePageProps): JSX.Element {
    const {
        isCheckingToken,
        isUserLoggedIn,
        user
    } = useSelector((state: StoreState) => state.auth);

    let element = <Loading />;

    if (isCheckingToken || !isUserLoggedIn) {
        return !isUserLoggedIn ? <LoginView /> : <Loading />;
    }

    if (!isUserLoggedIn) {
        element = <LoginView />;
    } else if (roles.length) {
        const userHasRoles = userHasPermissions(roles, user.roles);
        // @ts-ignore
        element = (!availableForUser || availableForUser(user)) && userHasRoles ? children : <AccessDeniedPage />;
    } else {
        // @ts-ignore
        element = children;
    }

    return element;
}
