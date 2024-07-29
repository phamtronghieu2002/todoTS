import axios from "..//configs/axios";

interface Task {
    id:number;
    name:string;
    taskColumnID:number;
    taskPosition:number;
    userID:number;
    position:number;
}

interface TaskAddRequestType{
    taskColumnid:number;
    userid:number;
    taskname:string;
}

interface TaskRemoveRequestType{
    taskColumnid:number;
    userid:number;
    taskPosition:number;
}
interface TaskUpdatePositionSameRowRequestType{
    taskColumnid:number;
    userid:number;
    fromPosition:number;
    toPosition:number;
    taskid:number
}
interface TaskUpdatePositionDifferenceRowRequestType{
  fromTaskColumnid:number;
  toTaskColumnid:number;
  userid:number;
  fromPosition:number;
  toPosition:number;
  taskid:number
}
export const getTaskByUserId = (id:number) => {
    return axios.get(`/task/user/${id}`);
  };

  export const getTaskById = (id:number) => {
    return axios.get(`/task/${id}`);
  };


  export const addTask = (data:TaskAddRequestType) => {
    return axios.post(`/task`,data);
  };

  export const removeTask = (data:TaskRemoveRequestType) => {
    return axios.delete(`/task`,{
        data:data
    });
  };

  export const updatePositionSameRow = (data:TaskUpdatePositionSameRowRequestType) => {
    return axios.post(`/task/dropSameRow`,data);
  };

  export const updatePositionDifferceRow = (data:TaskUpdatePositionDifferenceRowRequestType) => {
    return axios.post(`/task/dropDifferenceRow`,data);
  };
  export const updateDesc = (taskid:number,desc:string) => {
    return axios.put(`/task`,{taskid,desc});
  };
  export const updateTaskName = (taskid:number,nameTask:string) => {
    return axios.put(`/task/nameTask`,{taskid,nameTask});
  };


  