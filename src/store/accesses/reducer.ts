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
        accessesLoaded: (state: AccessStoreState, { payload: accesses }: PayloadAction<AccessResponse[]>) => {
            state.data = accesses;
        },
        ownerChanged: () => {
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAccessesThunk.pending, (state) => {
                // eslint-disable-next-line no-param-reassign
                state.isLoading = true;
            })
            .addCase(loadAccessesThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.data = payload;
            })
            .addCase(loadAccessesThunk.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export const {
    accessesLoaded,
    ownerChanged
} = accessSlice.actions;

export default accessSlice.reducer;
