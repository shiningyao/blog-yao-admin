import { SERVER_API_URL } from '@/app.constants';
import Http from "@/shared/utils/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';

export class AccountProvider {

    private http: Http;

    constructor() {
        this.http = new Http();
    }

    get(): Observable<AxiosResponse<Account>> {
        return this.http.get<Account>(SERVER_API_URL + 'api/account');
    }

    getData(): Observable<Account> {
        return this.get().pipe<Account>(map((res) => {
            return res.data;
        }));
    }

}