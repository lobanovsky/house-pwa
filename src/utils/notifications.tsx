import React, { ReactNode } from 'react';
import { ArgsProps } from 'antd/es/notification/interface';
import { AxiosResponse } from 'axios';

import { notificationsProvider } from 'global/NotificationsProvider';
import { ServerError } from './types';

// @ts-ignore
export const showMessage = (text: string | ReactNode, props?: ArgsProps = {}) => {
    notificationsProvider.success({
        // @ts-ignore
        message: '',
        description: text,
        ...props
    });
};

export const getErrorMessageFromServerResponse = (serverError: ServerError) => {
    const {
        response = {},
        error,
        message
    } = serverError || {};

    const serverResponse = response as AxiosResponse;

    if (serverResponse && serverResponse.status === 401) {
        return '';
    }

    let errorMessage = message || error || '';
    if (serverResponse.data) {
        errorMessage = serverResponse.data?.message || serverResponse.data?.error;
    }

    return errorMessage;
};

// @ts-ignore
export const showError = (text: string, serverError: ServerError = {}) => {
    const { response: serverResponse = {} } = serverError;

    // ошибки с 401 статусом не показываем - за это отвечает интерсептор
    // @ts-ignore
    if (serverResponse?.status === 401) {
        return;
    }

    const errorMessageFromServer = getErrorMessageFromServerResponse(serverError);
    let messageText = text;
    if (errorMessageFromServer && !errorMessageFromServer.includes('Request failed with status')) {
        // @ts-ignore
        messageText = (
            <div>
                <span className="default-msg">{`${messageText}.`}</span>
                <div className="server-msg" style={{ marginTop: '0.5em' }}>{errorMessageFromServer}</div>
            </div>
        );
    }

    notificationsProvider.error({
        message: '',
        description: messageText
    });
};
