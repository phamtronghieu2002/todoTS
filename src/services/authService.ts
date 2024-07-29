import axios from "..//configs/axios";

interface userAuth {
  username: string;
  password: string;
}

export const register = (data: userAuth) => {
  return axios.post("/auth/register", data);
};

export const login = (data: userAuth) => {
  return axios.post("/auth/login", data);
};

//api logout =>mobile khỏi làm
export const logout = () => {
  return axios.post("/auth/logout");
};
