import { deleteIntegration, get, post, put } from "../../providers/axios"
import config from "../config"

const url = config.url;

export const getAllUsers = async() => {
    try {
        const response = await get(`${url}/users`);
        return response?.data;
    } catch (error) {
        console.log('error get users: ', error);
    }
}

export const getUserById = async(id: string) => {
    try {
        const response = await get(`${url}/users/${id}`);
        return response?.data;
    } catch (error) {
        console.log('error get user: ', error);
    }
}

export const save = async (callback: (error: any, data?: any) => void, data: any) => {
    try {
        await post((error: any, response?: any) => {
            if (error) {
                callback(error);
            } else {
                callback(null, response);
            }
        }, `${url}/users`, data);
    } catch (error) {
        console.log('error post user: ', error);
    }
}

export const update = async (callback: (error: any, data?: any) => void, data: any) => {
    try {
        await put((error: any, response?: any) => {
            if (error) {
                callback(error);
            } else {
                callback(null, response);
            }
        }, `${url}/users/${data.id}`, data);
    } catch (error) {
        console.log('error post user: ', error);
    }
}

export const deleteUser = async(id: string) => {
    try {
        const response = await deleteIntegration(`${url}/users/${id}`);
        return response?.data;
    } catch (error) {
        console.log('error delete user: ', error);
    }
}
