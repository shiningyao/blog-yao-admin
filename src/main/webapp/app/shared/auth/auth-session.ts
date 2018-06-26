import Http from "@/shared/utils/http";
import { SERVER_API_URL } from "@/app.constants";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";
import { ThemeProvider } from "styled-components";

export class AuthServerProvider {

    private http: Http;

    constructor() {
        this.http = new Http();
    }

    login(credentials): Observable<AxiosResponse<void>> {
        const data = 'j_username=' + encodeURIComponent(credentials.username) +
            '&j_password=' + encodeURIComponent(credentials.password) +
            '&remember-me=' + credentials.rememberMe + '&submit=Login';
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        return this.http.post<string, void>(SERVER_API_URL + 'api/authentication', data, { headers });
    }

    logout() {
        return this.http.post(SERVER_API_URL + 'api/logout').pipe((res) => {
            this.http.get(SERVER_API_URL + 'api/account').subscribe(() => {}, () => {});
            return res;
        });
    }
}