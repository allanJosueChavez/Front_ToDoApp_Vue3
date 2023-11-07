import axiosInstance from "./api/axiosInstance";

async function signup(user){
    const response = await axiosInstance.post("/api/users/", user);
    return response;
}


async function login(user){
    const response = await axiosInstance.post("/api/users/login", user);
    return response;
}

export default {
    signup,
    login
}
