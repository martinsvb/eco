import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonGroup } from '@mui/material';
import { Languages } from '@eco/locales';

const UserLanguage = () => {

  const { t , i18n } = useTranslation();

  const handleClick = useCallback(
    (value: Languages) => {
      i18n.changeLanguage(value);
    },
    [i18n]
  );

  return (
    <ButtonGroup
      size="small"
      aria-label={t('labels:languageSelection')}
    >
      <Button
        variant={i18n.language.includes(Languages.en) ? 'contained' : 'outlined'}
        onClick={() => {
          handleClick(Languages.en)
        }}
      >
        {t('labels:en')}
      </Button>
      <Button
        variant={i18n.language.includes(Languages.cs) ? 'contained' : 'outlined'}
        onClick={() => {
          handleClick(Languages.cs)
        }}
      >
        {t('labels:cs')}
      </Button>
    </ButtonGroup>
  );
}

export default UserLanguage;
