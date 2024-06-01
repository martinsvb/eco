import { is } from 'ramda';

export const getErrorValue = (error: unknown) => {
    return JSON.stringify(is(Object, error) ? (error.apiErrorData ?? error ) : null);
}
