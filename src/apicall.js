import axios from "axios"

const BASE_URL = "https://taskbackend-szch.onrender.com"

export const userRequest = axios.create({
    baseURL:BASE_URL
})

