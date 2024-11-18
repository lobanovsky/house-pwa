import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuth } from 'store/auth/selectors';
import Login from 'views/auth/login';
import AccessDeniedPage from 'views/auth/access-denied-page';
import { NavigationItems } from '../navigation';
import { PrivatePage } from './private-route';

export function AppRoutes() {
    const {
        user,
    } = useSelector(getAuth);
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/no-access" element={<AccessDeniedPage />} />
            {NavigationItems.map(
                ({
                     roles = [],
                     key = '',
                     component,
                     availableForUser = undefined,
                     ...routeProps
                 }) => (
                    // @ts-ignore
                    <Route
                      key={key}
                      {...routeProps}
                      path={key as string}
                      element={<PrivatePage roles={roles} availableForUser={availableForUser}>{component}</PrivatePage>}
                    />
                )
            )}
            <Route
              path="*"
              element={<Navigate to={user.ownerId ? '/accesses' : '/profile'} replace />}
            />

        </Routes>
    );
}
