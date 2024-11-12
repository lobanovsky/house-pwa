import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { ownerChanged } from './reducer';
import { loadAccessesThunk } from './thunks';
import { loginSuccess } from '../auth/reducer';

export const accessMiddleware = createListenerMiddleware();

accessMiddleware.startListening({
    matcher: isAnyOf(loginSuccess),
    effect: async ({ payload: user }: any, listenerApi: any) => {
        if (user.ownerId) {
            listenerApi.dispatch(loadAccessesThunk(user.ownerId));
        }
    }
});
