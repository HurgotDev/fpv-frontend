import axios from 'axios'
import { PROTOCOL_HTTP, HOST_API, TOKEN_NAME } from 'environment'

const getHeaders = () => {
    const token = typeof window !== 'undefined' && window.localStorage.getItem(TOKEN_NAME)

    return {
        authorization: token ? `Bearer ${token}` : '',
    }
}

const axiosClient = () => {
    return axios.create({
        baseURL: `${PROTOCOL_HTTP}://${HOST_API}`,
        headers: getHeaders(),
    })
}

export default axiosClient
