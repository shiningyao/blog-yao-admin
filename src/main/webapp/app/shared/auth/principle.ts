import { Subject } from "rxjs";

class Principle {
    private userIdentity: any;
    private authenticated = false;
    private authenticationState = new Subject<any>();

    authenticate(identity) {
        this.userIdentity = identity;
        this.authenticated = !!identity;
        this.authenticationState.next(this.userIdentity);
    }

    identity(force?: boolean) {

        if(force === true) {
            this.userIdentity = undefined;
        }

        if(this.userIdentity) {
            Promise.resolve(this.userIdentity);
        }
        
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }
}

export default new Principle();