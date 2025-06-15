import axios, { AxiosResponse } from "axios"
import { removeSession } from "../auth/auth.utils"

const baseURL = 'https://localhost:5297/api'

const axiosInstance = axios.create({ baseURL })

axiosInstance.interceptors.response.use((response: AxiosResponse) => {
    if (response.status === 401) {
        removeSession()
    }
    return response
})

export default axiosInstance