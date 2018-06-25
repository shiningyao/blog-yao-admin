import Http from "@/shared/utils/http";
import { SERVER_API_URL } from "@/app.constants";

export class AuthServerProvider {

    private http: Http;

    constructor() {
        this.http = new Http();
    }

    login(credentials) {
        const data = 'j_username=' + encodeURIComponent(credentials.username) +
            '&j_password=' + encodeURIComponent(credentials.password) +
            '&remember-me=' + credentials.rememberMe + '&submit=Login';
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        return this.http.post(SERVER_API_URL + 'api/authentication', data, { headers });
    }
}