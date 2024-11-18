import axios from 'axios';
import stc from 'string-to-color';

import { axiosNotAuthorizedInterceptor } from 'backend/axios';
import { EnumUserRequestRole, UserResponse } from 'backend';
import { NavigationItems } from 'navigation/navigation';
import store from 'store';
import { EMPTY_USER, loginSuccess, logout } from 'store/auth/reducer';
import { IUserData } from 'utils/types';
import { loadUserProfile } from './services';

export const getUserDefaultPage = (user: IUserData, pathname?: string) => {
    const defaultPage = user.ownerId ? '/accesses' : '/profile';
    const isEmptyRoute = !pathname || !NavigationItems.find(({ key: path }) => path === pathname);
    const pathToRedirect = isEmptyRoute ? defaultPage : pathname;

    return {
        path: pathToRedirect,
        initPathNotFound: isEmptyRoute
    };
};

const onSuccessLoadUser = (userData: UserResponse & IUserData, navigate: any, routeToOpen: string = '') => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { access_token } = userData;
    axios.defaults.headers.Authorization = access_token ? `Bearer ${access_token}` : '';
    axios.interceptors.response.use((response) => response, (resp) => axiosNotAuthorizedInterceptor(resp, store.dispatch));
    const fullUserData: IUserData = {
        ...userData,
        roles: userData.role?.roleCode ? [userData.role?.roleCode as EnumUserRequestRole] : [],
        isAdmin: userData.role?.roleCode === EnumUserRequestRole.STAFF_ADMIN,
        isSuperAdmin: userData.role?.roleCode === EnumUserRequestRole.SUPER_ADMIN
    };

    const {
        path: pathToRedirect,
        initPathNotFound
    } = getUserDefaultPage(fullUserData, routeToOpen);
    store.dispatch(loginSuccess(fullUserData));
    // eslint-disable-next-line max-len
    console.log(`%c After get user data  go to [${pathToRedirect}] ${initPathNotFound ? `(BECAUSE route [${routeToOpen}] not found!!)` : ''}`, 'color:blue');
    navigate(pathToRedirect);
};

export const getUserData = (authData: IUserData, navigate: any, redirectAfter?: string) => {
    const {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        access_token = '',
        userId = 0
    } = authData;

    const tokenStr = access_token ? `Bearer ${access_token}` : '';

    loadUserProfile(tokenStr, userId, (isSuccess, userProfile = { ...EMPTY_USER }) => {
        if (!isSuccess) {
            store.dispatch(logout());
        } else {
            const userNameParts = (userProfile?.name || '').split(' ');
            const firstName = userNameParts.length > 1 ? userNameParts[1] : (userNameParts.length ? userNameParts[0] : '');
            const resultUser: IUserData = {
                ...authData,
                ...userProfile,
                firstName,
                userColor: stc(userProfile?.name || '')
            };

            onSuccessLoadUser(resultUser, navigate, redirectAfter);
        }
    });
};
