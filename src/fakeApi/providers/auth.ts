import { LoginUser } from "../../interfaces/login";
import { post } from "../../providers/axios"
import config from "../config"

const url = config.url;

export const login = async (callback: (error: any, data?: any) => void, data: LoginUser) => {
    try {
        await post((error: any, response?: any) => {
            if (error) {
                callback(error);
            } else {
                callback(null, response);
            }
        }, `${url}/auth/login`, data);
    } catch (error) {
        console.log('error login: ', error);
    }
}