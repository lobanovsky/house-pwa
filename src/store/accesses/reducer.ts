/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction, SliceCaseReducers, } from '@reduxjs/toolkit';
import { AccessResponse } from 'backend';

import { LoadingState } from 'store/types';
import { loadAccessesThunk } from './thunks';

export type AccessStoreState = LoadingState<AccessResponse[]>;
// @ts-ignore
const accessSlice = createSlice<AccessStoreState, SliceCaseReducers<AccessStoreState>>({
    name: 'accesses',
    initialState: {
        isLoading: false,
        data: []
    },
    reducers: {
        accessChanged: () => {
        },
        ownerChanged: (state: AccessStoreState, { payload: ownerId }: PayloadAction<number>) => {
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAccessesThunk.pending, (state, action) => {
                // eslint-disable-next-line no-param-reassign
                state.isLoading = true;
            })
            .addCase(loadAccessesThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.data = payload;
                console.log('%c Acceses loaded success', 'color: blue');
            })
            .addCase(loadAccessesThunk.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
});

export const {
    accessChanged,
    ownerChanged
} = accessSlice.actions;

export default accessSlice.reducer;