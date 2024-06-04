export enum Languages {
    cs = 'cs',
    en = 'en',
    sk = 'sk',
}

export const getLanguageCode = (language: string) => language.includes('-') ? language.split('-')[0] : language;

export const getLanguage = (language: string) => {
    const lngCode = getLanguageCode(language);
    return Object.values(Languages).includes(lngCode as Languages)
        ? lngCode
        : Languages.en;
}
