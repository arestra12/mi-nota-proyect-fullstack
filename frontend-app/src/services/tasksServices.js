const API_URL=import.meta.env.VITE_API_URL

import { fetchWithAuth } from "./fetchWithAuth"


export const getTasks= async ()=>{
    return fetchWithAuth(`${API_URL}/tasks`)   
}

export const createTask =async(task)=>{
    const data= await fetchWithAuth(`${API_URL}/tasks`,{
        method:"POST",
        body:{text:task.text}})    
    return data.task
}


export const deleteSoftTaskApi = async (id) => {
  return fetchWithAuth(`${API_URL}/tasks/${id}/soft-delete`, {method: "PATCH"})
}



export const deleteAllTaskApi = async () => {
  return fetchWithAuth(`${API_URL}/tasks`, {
    method: "DELETE"
  })
}



export const patchTask=async(task)=>{
    const data= await fetchWithAuth(`${API_URL}/tasks/${task.id}`,{method:"PATCH",body:{text:task.text}})
    return data.task
}


export const patchState=async(task)=>{  
    const data = await fetchWithAuth(`${API_URL}/tasks/${task.id}`,{method:"PATCH",body:{completed: !task.completed}})
    return data.task
}


