import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginError } from '../../reducers/auth';

export const authMiddleware = createListenerMiddleware();

authMiddleware.startListening({
    matcher: isAnyOf(loginError),
    effect: async () => {
        delete axios.defaults.headers.Authorization;
    }

});
