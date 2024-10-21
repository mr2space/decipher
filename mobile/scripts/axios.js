import axios from "axios";
import { urls as URL } from "../constants";

export default axios.create({
    baseURL:URL.BASE_URL,
})

export const axiosPrivate = axios.create({
    baseURL : URL.BASE_URL,
    headers : {
        "Content-Type":"application/json",
    },
    withCredentials: true
})

