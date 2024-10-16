const PhoneDisplayRegex = /^7(?<code>\d{3})(?<gr2>\d{3})(?<gr3>\d{2})(?<gr4>\d{2})$/;
const PhoneBackendRegex = /^7\d{10}$/;

export const phoneNumberRenderer = (phoneStr: string = '') => {
    const phoneOnlyDigits = phoneStr.replace(/\D/g, '');
    if (!PhoneBackendRegex.test(phoneOnlyDigits)) {
        return phoneStr;
    }

    // @ts-ignore
    const { groups = {} } = PhoneDisplayRegex.exec(phoneOnlyDigits);
    const {
        code = '',
        ...otherGroups
    } = groups;
    if (!code) {
        return '';
    }

    return `+7 (${code}) ${Object.values(otherGroups)
        .join('-')}`;
};
