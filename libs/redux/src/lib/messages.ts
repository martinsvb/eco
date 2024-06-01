import i18n from '@eco/locales';

export const errorMessages: {[key: number]: string} = {
    400: i18n.t('apiError:BAD_REQUEST'),
    401: i18n.t('apiError:UNAUTHORIZED'),
    403: i18n.t('apiError:FORBIDDEN'),
    404: i18n.t('apiError:NOT_FOUND'),
    405: i18n.t('apiError:METHOD_NOT_ALLOWED'),
    406: i18n.t('apiError:NOT_ACCEPTABLE'),
    408: i18n.t('apiError:REQUEST_TIMEOUT'),
    409: i18n.t('apiError:CONFLICT'),
    415: i18n.t('apiError:UNSUPPORTED_MEDIA_TYPE'),
    419: i18n.t('apiError:INSUFFICIENT_SPACE_ON_RESOURCE'),
    420: i18n.t('apiError:METHOD_FAILURE'),
    422: i18n.t('apiError:UNPROCESSABLE_ENTITY'),
    423: i18n.t('apiError:LOCKED'),
    429: i18n.t('apiError:TOO_MANY_REQUESTS'),
    500: i18n.t('apiError:INTERNAL_SERVER_ERROR'),
    501: i18n.t('apiError:NOT_IMPLEMENTED'),
    503: i18n.t('apiError:SERVICE_UNAVAILABLE'),
    504: i18n.t('apiError:GATEWAY_TIMEOUT'),
};
