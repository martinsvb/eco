import * as yup from "yup";

export enum LoginItems {
    email = 'email',
    password = 'password',
}

export interface LoginData {
    [LoginItems.email]: string;
    [LoginItems.password]: string;
}

export const getLoginValidationSchema = () => {
    return yup.object().shape({
      [LoginItems.email]: yup.string()
        .email('Invalid email')
        .required('Required'),
      [LoginItems.password]: yup.string()
        .required('Required'),
    });
}
