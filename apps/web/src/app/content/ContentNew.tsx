import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import ContentForm from './ContentForm';
import { ContentTypes } from '@eco/types';

interface ContentNewProps {
  type: ContentTypes;
}

export const ContentNew = ({type}: ContentNewProps) => {

  const { t } = useTranslation();

  const title = useMemo(
    () => {
      const contentTitles = {
        [ContentTypes.Article]: t('content:newArticleTitle'),
        [ContentTypes.New]: t('content:newNewTitle'),
        [ContentTypes.Task]: t('content:newTaskTitle'),
      };

      return contentTitles[type] || t('content:new');
    },
    [t, type]
  );

  return (
    <>
      <Typography variant='h3' mb={3}>{title}</Typography>
      <ContentForm type={type} />
    </>
  );
};
