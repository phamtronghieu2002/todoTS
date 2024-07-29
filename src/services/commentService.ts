import axios from "..//configs/axios";



export const addComment = (taskid:number,content:string) => {
  return axios.post("/comment", {taskid,content});
};