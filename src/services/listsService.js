import axiosInstance from "./api/axiosInstance";

async function getAllLists(userId) {
    const res = await axiosInstance.get(`/api/lists/${userId}`);
    console.log(res);
    return res;
    // console.log(res);
    // allLists.value = res.data;
    // console.log(allLists.value);
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