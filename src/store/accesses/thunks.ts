import { createAsyncThunk } from '@reduxjs/toolkit';
import { AccessResponse, AccessService } from 'backend';
import { LoadingState } from '../types';

export const loadAccessesThunk = createAsyncThunk<AccessResponse[], number, {
    state: { accesses: LoadingState<AccessResponse[]> }
}>(
    'access/loadByOwnerId',
    async (ownerId) => {
        console.log(`%c Load accesses for ownerId=[${ownerId}]`);
        return AccessService.findByOwner({ ownerId });
    }
);
