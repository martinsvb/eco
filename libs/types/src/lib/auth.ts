export interface BasicUser {
    name: string | null;
    picture: string | null;
}

export enum AuthOperations {
    login = 'login',
    loginGoogle = 'loginGoogle',
    refresh = 'refresh',
    register = 'register',
    resend = 'resend',
    verify = 'verify'
}
