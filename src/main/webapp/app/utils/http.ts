import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, Observer, Subscriber } from 'rxjs';

export default class Http {

    axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
        });
    }

    get<T = any>(url, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> {
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

    getData<T = any>(url, config?: AxiosRequestConfig): Observable<T> {
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

}