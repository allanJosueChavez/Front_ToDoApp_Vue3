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

async function confirmAccount(userId){
    const response = await axiosInstance.post(`api/user/confirm-account/${userId}`);
    return response;
}


export default {
    create,
    login,
    verifyEmailConfirmationToken,
    confirmAccount,
}
