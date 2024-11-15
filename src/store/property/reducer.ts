/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction, SliceCaseReducers, } from '@reduxjs/toolkit';
import { RoomVO } from 'backend';

import { LoadingState } from 'store/types';
import { loadPropertyThunk } from './thunks';

export type PropertyStoreState = LoadingState<RoomVO[]>;
// @ts-ignore
const propertySlice = createSlice<PropertyStoreState, SliceCaseReducers<PropertyStoreState>>({
    name: 'property',
    initialState: {
        isLoading: false,
        data: []
    },
    reducers: {
        ownerChanged: (state: PropertyStoreState, { payload: ownerId }: PayloadAction<number>) => {
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPropertyThunk.pending, (state, action) => {
                // eslint-disable-next-line no-param-reassign
                state.isLoading = true;
            })
            .addCase(loadPropertyThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.data = payload;
            })
            .addCase(loadPropertyThunk.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
});

export const { ownerChanged } = propertySlice.actions;

export default propertySlice.reducer;
