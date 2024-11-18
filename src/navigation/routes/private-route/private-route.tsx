import React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';
import Loading from 'components/loading';
import { Navigate, Route } from 'react-router-dom';
import { userHasPermissions } from '../../utils';
import { PrivateRouteProps } from '../../types';

export function PrivateRoute({
                                 roles = [],
                                 ...routeProps
                             }: PrivateRouteProps): JSX.Element {
    const {
        isCheckingToken,
        isUserLoggedIn,
        user
    } = useSelector((state: StoreState) => state.auth);

    let route = <Navigate replace to="/login" />;

    if (isUserLoggedIn) {
        const userHasRequiredPermissions = userHasPermissions(roles, user.roles);
        route = userHasRequiredPermissions ? <Navigate replace to="/accedd-denied" /> : (
            <Route {...routeProps} />
        );
    } else if (isCheckingToken) {
        route = <Route {...routeProps} element={<Loading />} />;
    }

    return route;
}
