import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { apiGetContent, setContent, useAppDispatch } from '@eco/redux';
import { ContentTypes } from '@eco/types';
import ContentForm from './ContentForm';

interface ContentEditProps {
  type: ContentTypes;
}

export const ContentEdit = ({type}: ContentEditProps) => {

  const { t } = useTranslation();

  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(
    () => {
      if (id) {
        dispatch(apiGetContent({id, type}));
      }

      return () => {
        dispatch(setContent({data: null, type}));
      }
    },
    [dispatch, id, type]
  );

  const title = useMemo(
    () => {
      const contentTitles = {
        [ContentTypes.Article]: t('content:editArticleTitle'),
        [ContentTypes.New]: t('content:editNewTitle'),
        [ContentTypes.Task]: t('content:editTaskTitle'),
      };

      return contentTitles[type] || t('content:edit');
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
