import { UserRights } from "..";

export interface BasicUser {
    name: string | null;
    picture: string | null;
    rights: UserRights;
}

export enum AuthOperations {
    login = 'login',
    loginGoogle = 'loginGoogle',
    refresh = 'refresh',
    register = 'register',
    resend = 'resend',
    user = 'user',
    verify = 'verify'
}
