import { createAsyncThunk } from '@reduxjs/toolkit';
import { OwnerService, RoomVO } from 'backend';
import { LoadingState } from '../types';

export const loadPropertyThunk = createAsyncThunk<RoomVO[], number, {
    state: { property: LoadingState<RoomVO[]> }
}>(
    'property/loadByOwnerId',
    async (ownerId) => {
        console.log(`%c Load accesses for ownerId=[${ownerId}]`);
        return OwnerService.getRoomsByOwnerId({ ownerId });
    }
);
