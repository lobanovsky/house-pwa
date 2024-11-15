import { StoreState } from '../index';

export const getWorkspaceId = (state: StoreState) => state.auth.user?.workspaceId || 0;

export const getAuth = ({ auth }: StoreState) => auth;
export const getUser = (state: StoreState) => state.auth.user;
