import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NavigationItems } from '../navigation';
import { PrivatePage } from './private-route';

export function AppRoutes() {
    return (
        <Routes>
            {NavigationItems.map(
                ({
                     roles = [],
                     key = '',
                     component,
                     ...routeProps
                 }) => (
                     // @ts-ignore
                    <Route
                      key={key}
                      {...routeProps}
                      path={key as string}
                      element={<PrivatePage roles={roles}>{component}</PrivatePage>}
                    />
                )
            )}
            <Route
              path="*"
                // todo передедать
              element={<Navigate replace to="/granted-accesses" />}
            />
        </Routes>
    );
}
