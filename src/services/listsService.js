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

async function deleteList(listId){
    console.log(listId);
    const response =  await axiosInstance.delete(`/api/lists/${listId}`);
    return response;
}

async function createTask(task){
    const response =  await axiosInstance.post("/api/tasks", task);
    return response;
}

async function deleteTask(taskId){
    const response =  await axiosInstance.delete(`/api/tasks/${taskId}`);
    return response;
}

async function updateTask(taskId, task){
    const response =  await axiosInstance.patch(`/api/tasks/${taskId}`, task);
    return response;
}

async function getAllTasks(listId){
    const response =  await axiosInstance.get(`/api/tasks/${listId}`);
    return response;
}

async function updateListName(listId, body){
    const response =  await axiosInstance.patch(`/api/lists/name/${listId}`, body);
    return response;
}


export default {
    getAllLists,
    createList,
    deleteList,
    createTask,
    deleteTask,
    updateTask,
    getAllTasks,
    updateListName,
}