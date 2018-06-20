import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, Observer } from 'rxjs';

export default class Http {

    axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
        });
    }

    get<T = any>(url, config?: AxiosRequestConfig): AxiosPromise<T> {
        return this.axiosInstance.get.apply(this, arguments);
    }

}