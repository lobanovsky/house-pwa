import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { loadPropertyThunk } from './thunks';
import { loginSuccess } from '../auth/reducer';

export const propertyMiddleware = createListenerMiddleware();

propertyMiddleware.startListening({
    matcher: isAnyOf(loginSuccess),
    effect: async ({ payload: user }: any, listenerApi: any) => {
        if (user.ownerId) {
            listenerApi.dispatch(loadPropertyThunk(user.ownerId));
        }
    }
});
