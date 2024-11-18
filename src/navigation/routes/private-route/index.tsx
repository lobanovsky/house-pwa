import React from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from 'store';
import Loading from 'components/loading';
import { Navigate } from 'react-router-dom';
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
    //
    // if (isCheckingToken || !isUserLoggedIn) {
    //     return !isUserLoggedIn ? <Navigate to="/login" replace /> : <Loading />;
    // }

    if (!isUserLoggedIn) {
        element = <Navigate to="/login" />;
    } else if (roles.length) {
        const userHasRoles = userHasPermissions(roles, user.roles);
        // @ts-ignore
        element = (!availableForUser || availableForUser(user)) && userHasRoles ? children : <Navigate to="/access-denied" replace />;
    } else {
        // @ts-ignore
        element = children;
    }

    return element;
}
