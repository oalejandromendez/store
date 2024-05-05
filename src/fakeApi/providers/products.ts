import { deleteIntegration, get, post, put } from "../../providers/axios"
import config from "../config"

const url = config.url;

export const getAllProducts = async() => {
    try {
        const response = await get(`${url}/products`);
        return response?.data;
    } catch (error) {
        console.log('error get products: ', error);
    }
}

export const getProductById = async(id: string) => {
    try {
        const response = await get(`${url}/products/${id}`);
        return response?.data;
    } catch (error) {
        console.log('error get product: ', error);
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
        }, `${url}/products`, data);
    } catch (error) {
        console.log('error post product: ', error);
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
        }, `${url}/products/${data.id}`, data);
    } catch (error) {
        console.log('error post product: ', error);
    }
}

export const deleteProduct = async(id: string) => {
    try {
        const response = await deleteIntegration(`${url}/products/${id}`);
        return response?.data;
    } catch (error) {
        console.log('error delete product: ', error);
    }
}
