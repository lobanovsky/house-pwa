import { authMiddleware } from './auth/middleware';
import { accessMiddleware } from './accesses/middleware';
import { propertyMiddleware } from './property/middleware';

export const storeMiddleware = (getDefaultMiddleware: any) => getDefaultMiddleware({
    serializableCheck: false
})
    .prepend(
        authMiddleware.middleware,
        accessMiddleware.middleware,
        propertyMiddleware.middleware
    );
