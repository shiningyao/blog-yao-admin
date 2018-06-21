export let isAuthenticated: boolean = false;

export function authenticate() {
    isAuthenticated = !isAuthenticated;
}