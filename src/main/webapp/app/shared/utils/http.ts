import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, Observer, Subscriber } from 'rxjs';
import * as Cookie from 'js-cookie';

export default class Http {

    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN'
        });
        this.axiosInstance.interceptors.request.use((config) => {
            const xsrfToken = Cookie.get('XSRF-TOKEN');
            config.headers['X-XSRF-TOKEN'] = xsrfToken;
            return config;
        }, (error) => {
            return Promise.reject(error)
        });
    }

    get<T = any>(url: string, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> {
        const observable: Observable<AxiosResponse<T>> = Observable.create((observer: Observer<AxiosResponse<T>>) => {
            this.axiosInstance.get(url, config).then((res) => {
                observer.next(res);
                observer.complete();
            }).catch((error) => {
                observer.error(error);
            });
        });
        return observable;
    }

    getData<T = any>(url: string, config?: AxiosRequestConfig): Observable<T> {
        const observable: Observable<T> = Observable.create((observer: Observer<T>) => {
            this.get(url, config).subscribe((res) => {
                observer.next(res.data);
                observer.complete();
            }, (error) => {
                observer.error(error);
            });
        });
        return observable;
    }

    post<D = any, T = any>(url: string, data?: D, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> {
        const observable: Observable<AxiosResponse<T>> = Observable.create((observer: Observer<AxiosResponse<T>>) => {
            this.axiosInstance.post(url, data, config).then((res) => {
                observer.next(res);
                observer.complete();
            }).catch((error) => {
                observer.error(error);
            });
        });
        return observable;
    }

}