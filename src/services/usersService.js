import axiosInstance from "./api/axiosInstance";

async function create(user){
    const response = await axiosInstance.post("/api/users/", user);
    return response;
}


async function login(user){
    const response = await axiosInstance.post("/api/users/login", user);
    return response;
}

export default {
    create,
    login
}
