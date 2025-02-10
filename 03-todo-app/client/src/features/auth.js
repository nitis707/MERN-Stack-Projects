import axios from "axios";

export const registerUser = (data) => {
    return axios.post("/user/register", data);
}

export const login = (data) => {
    return axios.post("/user/login", data);
}