import axiosInstance from "./api/axiosInstance";

async function create(user){
    const response = await axiosInstance.post("/api/users/", user);
    return response;
}

async function login(credentials){
    const response = await axiosInstance.post("/api/auth/login", credentials);
    return response;
}

export default {
    create,
    login
}
