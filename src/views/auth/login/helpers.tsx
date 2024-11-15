import axios from 'axios';
import stc from 'string-to-color';

import { axiosNotAuthorizedInterceptor } from 'backend/axios';
import { EnumUserRequestRole, UserResponse } from 'backend';
import { EMPTY_USER, loginSuccess, logout } from 'store/auth/reducer';
import { IUserData } from 'utils/types';

import { loadUserProfile } from './services';

const onSuccessLoadUser = (userData: UserResponse & IUserData, dispatch: any, onFinish?: (user: IUserData) => void) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { access_token } = userData;
    axios.defaults.headers.Authorization = access_token ? `Bearer ${access_token}` : '';
    axios.interceptors.response.use((response) => response, (resp) => axiosNotAuthorizedInterceptor(resp, dispatch));
    const fullUserData: IUserData = {
        ...userData,
        roles: userData.role?.roleCode ? [userData.role?.roleCode as EnumUserRequestRole] : [],
        isAdmin: userData.role?.roleCode === EnumUserRequestRole.STAFF_ADMIN,
        isSuperAdmin: userData.role?.roleCode === EnumUserRequestRole.SUPER_ADMIN
    };
    dispatch(loginSuccess(fullUserData));

    if (onFinish) {
        onFinish(fullUserData);
    }
};

export const getUserData = (authData: IUserData, dispatch: any, onFinish?: (user: IUserData) => void) => {
    const {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        access_token = '',
        userId = 0
    } = authData;

    const tokenStr = access_token ? `Bearer ${access_token}` : '';

    loadUserProfile(tokenStr, userId, (isSuccess, userProfile = { ...EMPTY_USER }) => {
        if (!isSuccess) {
            dispatch(logout());
        } else {
            const userNameParts = (userProfile?.name || '').split(' ');
            const firstName = userNameParts.length > 1 ? userNameParts[1] : (userNameParts.length ? userNameParts[0] : '');
            const resultUser: IUserData = {
                ...authData,
                ...userProfile,
                firstName,
                userColor: stc(userProfile?.name || '')
            };

            onSuccessLoadUser(resultUser, dispatch, onFinish);
        }
    });
};
