export const saveLogin = (name) => {
    return {
        type: 'Save_Login_Name',
        payload: name
    }
};