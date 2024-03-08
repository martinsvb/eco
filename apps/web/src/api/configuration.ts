export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum REQUEST_STATUS {
  ERROR = 'error',
  PENDING = 'pending',
  SUCCESS = 'success',
  IDDLE = 'iddle',
}

export interface ApiRequestStatus<RequestPayload = unknown> {
  status: REQUEST_STATUS;
  payload?: RequestPayload;
}

const baseHeaders = {
  "Content-Type": "application/json",
}

export const prepareFetchHeaders = <T>(
  method: HTTP_METHODS,
  {body, signal, token}: {
    body?: T,
    signal?: RequestInit["signal"],
    token?: string
  },
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
