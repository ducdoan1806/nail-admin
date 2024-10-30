import axios from "axios";
import { getCookie } from "../utils/util";

export const API_URL = "http://backend:8000/";
const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "Application/json",
  },
});
export const authHttp = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "Application/json",
    Authorization:getCookie('authToken')
  },
});
export default http;
