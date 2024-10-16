import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NavigationItems } from '../navigation';

export function AppRoutes() {
    return (
        <Routes>
            {NavigationItems.map(
                ({
                     key = '',
                     component
                 }) => (
                    <Route
                      key={key}
                      path={key as string}
                      element={component}
                    />
                )
            )}
            <Route
              path="*"
                // todo передедать
              element={<Navigate replace to="/car-search" />}
            />
        </Routes>
    );
}
