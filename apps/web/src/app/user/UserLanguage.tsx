import { MouseEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonGroup } from '@mui/material';
import { Languages } from '@eco/locales';

const UserLanguage = () => {

  const { t , i18n} = useTranslation();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>, value: Languages) => {
      e.stopPropagation();
      i18n.changeLanguage(value)
    },
    [i18n]
  );

  return (
    <ButtonGroup
      variant="text"
      aria-label={t('labels:languageSelection')}
    >
      <Button onClick={(e) => handleClick(e, Languages.en)}>En</Button>
      <Button onClick={(e) => handleClick(e, Languages.cs)}>Cs</Button>
    </ButtonGroup>
  );
}

export default UserLanguage;
