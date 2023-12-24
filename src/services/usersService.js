import axiosInstance from "./api/axiosInstance";

async function create(user){
    const response = await axiosInstance.post("/api/users/", user);
    return response;
}

async function login(credentials){
    const response = await axiosInstance.post("/api/auth/login", credentials);
    return response;
}


async function verifyEmailConfirmationToken(token){
    const body = {
        token: token,
    }
    const response = await axiosInstance.post("/api/users/verify-token", body);
    return response;
}

async function confirmAccount(body){
    const response = await axiosInstance.post(`api/user/confirm-account`, body);
    return response;
}

async function resendEmailConfirmation(body){
    const response = await axiosInstance.post(`api/user/resend-email-confirmation`, body);
    return response;
}


async function loginThroughToken(body){
    const response = await axiosInstance.post(`api/user/login-through-token`, body);
    return response;
}

async function updateUserInfo(){
    const response = await axiosInstance.patch(`api/user`);
    return response;
}


export default {
    create,
    login,
    verifyEmailConfirmationToken,
    confirmAccount,
    resendEmailConfirmation,
    loginThroughToken,
    updateUserInfo,
}
