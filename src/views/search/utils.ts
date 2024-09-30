export const getPhoneNumberForCall = (phone: string = '') => {
    if (!phone) {
        return ''
    }
    let result = phone;
    if (result.startsWith('7')) {
        result = `+${result}`
    } else if (result.startsWith('8')) {
        result = result.substring(1, 20);
        result = `+7${result}`
    } else if (result.startsWith('9')) {
        result = `+7${result}`
    }

    return result;
}
