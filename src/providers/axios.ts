import axios, { AxiosResponse } from "axios"

export const get = async( url:string ) => {
    try {
        return await axios.get(url);
    } catch (error) {
        console.error('Error axios get: ', error);
    }
}

export const post = async(callback: (error: any, data?: any) => void, url:string, data: any) => {
    return await axios.post(url, data)
    .then((response: AxiosResponse<any>) => {
        callback(null, response.data);
    })
    .catch((error: any) => {
        callback(error);
    });
}

export const put = async(callback: (error: any, data?: any) => void, url:string, data: any) => {
    return await axios.put(url, data)
    .then((response: AxiosResponse<any>) => {
        callback(null, response.data);
    })
    .catch((error: any) => {
        callback(error);
    });
}

export const deleteIntegration = async( url:string) => {
    try {
        return await axios.delete(url);
    } catch (error) {
        console.error('Error axios get: ', error);
    }
}
