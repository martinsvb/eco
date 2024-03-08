export class ApiError extends Error {
  apiErrorData = {
    message: '',
    status: 0,
    url: '',
  };

  constructor(response: Response) {
    const { status, statusText, url } = response;

    super(statusText);
    this.apiErrorData.message = statusText;
    this.apiErrorData.status = status;
    this.apiErrorData.url = url;
  }
}

export const checkResponse = (response: Response) => {
  if (!response.ok) {
    throw new ApiError(response);
  }

  return response;
};
