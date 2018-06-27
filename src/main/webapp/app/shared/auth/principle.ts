import { AccountProvider } from './account';
import { Subject, Observable, Observer } from "rxjs";

class Principle {

    private userIdentity: Account;
    private authenticated = false;
    private authenticationState = new Subject<Account>();
    private account: AccountProvider = new AccountProvider();

    authenticate(identity) {
        this.userIdentity = identity;
        this.authenticated = !!identity;
        this.authenticationState.next(this.userIdentity);
    }

    identity(force?: boolean): Observable<Account> {

        if(force === true) {
            this.userIdentity = undefined;
        }

        return Observable.create((observer: Observer<Account>) => {
            if(this.userIdentity) {
                observer.next(this.userIdentity);
                observer.complete();
            } else {
                this.account.getData().subscribe((account: Account) => {
                    if(account) {
                        this.userIdentity = account;
                        this.authenticated = true;
                    } else {
                        this.userIdentity = null;
                        this.authenticated = false;
                    }
                    observer.next(this.userIdentity);
                    observer.complete();
                    this.authenticationState.next(this.userIdentity);
                }, (error) => {
                    this.userIdentity = null;
                    this.authenticated = false;
                    observer.next(this.userIdentity);
                    this.authenticationState.next(this.userIdentity);
                });
            }
        });
        
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

    getAuthenticationState(): Observable<Account> {
        return this.authenticationState.asObservable();
    }
}

export default new Principle();