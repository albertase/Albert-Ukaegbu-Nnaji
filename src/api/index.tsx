import axios from "axios";
import config from "../configs";

const { BASE_URL } = config;

export const getUsersApi = () => {
  return axios.get(`${BASE_URL}/lendsqr/api/v1/users`);
};

export const getUserApi = (id: number) => {
  return axios.get(`${BASE_URL}/lendsqr/api/v1/users/${id}`);
};
