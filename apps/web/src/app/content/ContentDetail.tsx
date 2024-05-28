import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import {
  apiGetContent,
  resetContentItem,
  selectContentPreview,
  selectUserAuth,
  useAppDispatch,
  useAppSelector,
  useShallowEqualSelector
} from '@eco/redux';
import { ContentTypes, contentScopes } from '@eco/types';
import ContentForm from './ContentForm';
import ContentPreview from './ContentPreview';
import { useMobileDetection } from '../hooks/useMobileDetection';

interface ContentDetailProps {
  type: ContentTypes;
}

export const ContentDetail = ({type}: ContentDetailProps) => {

  const { t } = useTranslation();

  const { id } = useParams();

  const isMobile = useMobileDetection();

  const dispatch = useAppDispatch();

  const { rights: { scopes } } = useShallowEqualSelector(selectUserAuth);

  const isPreview = useAppSelector(selectContentPreview);

  useEffect(
    () => {
      if (id) {
        dispatch(apiGetContent({id, type}));
      }

      return () => {
        dispatch(resetContentItem({type}));
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

  const scope = contentScopes[type];

  return (
    <Box px={isMobile ? undefined : 2}>
      {!isPreview && scopes[scope]?.edit && <Typography variant='h3'>{title}</Typography>}
      {!isPreview && scopes[scope]?.edit
        ? <ContentForm type={type} />
        : <ContentPreview type={type} scope={scope} />
      }
    </Box>
  );
};
