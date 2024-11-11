import { AxiosError, AxiosResponse } from 'axios';
import { AvailableWorkspaceResponse, EnumUserRequestRole, TokenResponse, UserResponse } from '../backend';

export type EmptyFunction = () => void;

// @ts-ignore
export interface ServerError extends Error, AxiosError, AxiosResponse {
    error?: string;
}

export type ActionFinishCallback = (isSuccess: boolean) => void;
export type ActionCallbackWithData<T> = (isSuccess: boolean, data?: T | null) => void;
export type ActionCallback = () => void;

export type PermissionsConfig = string[] | { OR: string[] };

export interface AuthData extends Omit<TokenResponse, 'workspaces'> {}

export interface IUserData extends AuthData, UserResponse {
    workspaceColor: string,
    workspaceId: number;
    userColor: string;
    firstName: string;
    workspaceName: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    roles: EnumUserRequestRole[];
}
