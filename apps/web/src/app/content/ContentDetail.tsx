import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import {
  apiGetContent,
  selectContentPreview,
  selectUserAuth,
  setContent,
  useAppDispatch,
  useAppSelector,
  useShallowEqualSelector
} from '@eco/redux';
import { ContentTypes } from '@eco/types';
import ContentForm from './ContentForm';
import ContentPreview from './ContentPreview';

interface ContentDetailProps {
  type: ContentTypes;
}

export const ContentDetail = ({type}: ContentDetailProps) => {

  const { t } = useTranslation();

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { rights: { scopes: { tasks } } } = useShallowEqualSelector(selectUserAuth);

  const isPreview = useAppSelector(selectContentPreview);

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
        [ContentTypes.Record]: t('content:editRecordTitle'),
        [ContentTypes.New]: t('content:editNewTitle'),
        [ContentTypes.Task]: t('content:editTaskTitle'),
      };

      return contentTitles[type] || t('content:edit');
    },
    [t, type]
  );

  return (
    <>
      {!isPreview && tasks.edit && <Typography variant='h3'>{title}</Typography>}
      {!isPreview && tasks.edit
        ? <ContentForm type={type} />
        : <ContentPreview type={type} />
      }
    </>
  );
};
