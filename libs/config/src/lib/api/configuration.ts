export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const baseHeaders = {
  "Content-Type": "application/json",
}

type HeadersPayload<T> = {
  body?: T,
  signal?: RequestInit["signal"],
  token?: string
}

export const headers = <T>(
  method: METHODS,
  {body, signal, token}: HeadersPayload<T>,
) => {

  return {
    method,
    body: JSON.stringify(body),
    headers: token
      ? {
        ...baseHeaders,
        Authorization: `Bearer ${token}`,
      }
      :
      baseHeaders,
    signal,
  };
};

export const getHeaders = <T>(payload: HeadersPayload<T>) => headers(METHODS.GET, payload);

export const delHeaders = <T>(payload: HeadersPayload<T>) => headers(METHODS.DELETE, payload);

export const patchHeaders = <T>(payload: HeadersPayload<T>) => headers(METHODS.PATCH, payload);

export const postHeaders = <T>(payload: HeadersPayload<T>) => headers(METHODS.POST, payload);

export const putHeaders = <T>(payload: HeadersPayload<T>) => headers(METHODS.PUT, payload);
