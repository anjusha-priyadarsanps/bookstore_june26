import axiosInstance from "./axiosinstance";


const apiService = async (httpMethod, url, reqBody, reqHeader) => {

    const reqConfig = {
        method: httpMethod,
        url,
        data: reqBody,
        headers: reqHeader
    }

    try {
        const reponse = await axiosInstance(reqConfig)
        return reponse


    }
    catch (err) {
        return err
    }
} 

export default apiService