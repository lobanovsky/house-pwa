import { AxiosError, AxiosResponse } from "axios";

export type EmptyFunction = () => void;
// @ts-ignore
export interface ServerError extends Error, AxiosError, AxiosResponse {
	error?: string;
}

export type ActionFinishCallback = (isSuccess: boolean) => void;
export type ActionCallbackWithData<T> = (isSuccess: boolean, data?: T | null) => void;
export type ActionCallback = () => void;

