import axiosInstance from "./api/axiosInstance";

async function getAllLists() {
    const res = await axiosInstance.get(`/api/lists`);
    return res;
}

async function createList(ToDoList){
    const response =  await axiosInstance.post("/api/lists", ToDoList);
    console.log(response);
    return response;
}


export default {
    getAllLists,
    createList
}