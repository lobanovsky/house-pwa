import { createAsyncThunk } from '@reduxjs/toolkit';
import { AccessResponse, AccessService } from 'backend';
import { LoadingState } from '../types';

export const loadAccessesThunk = createAsyncThunk<AccessResponse[], number, {
    state: { accesses: LoadingState<AccessResponse[]> }
}>(
    'access/loadByOwnerId',
    async (ownerId) => AccessService.findByOwner({ ownerId })
);
