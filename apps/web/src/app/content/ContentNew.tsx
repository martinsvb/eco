import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { ContentTypes, contentScopes } from '@eco/types';
import {
  useShallowEqualSelector,
  selectUserAuth,
  useAppSelector,
  selectContentPreview,
  resetContentItem,
  useAppDispatch
} from '@eco/redux';
import ContentForm from './ContentForm';
import ContentPreview from './ContentPreview';

interface ContentNewProps {
  type: ContentTypes;
}

export const ContentNew = ({type}: ContentNewProps) => {

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { rights: { scopes } } = useShallowEqualSelector(selectUserAuth);

  const isPreview = useAppSelector(selectContentPreview);

  useEffect(
    () => {
      return () => {
        dispatch(resetContentItem({type}));
      }
    },
    [dispatch, type]
  );

  const title = useMemo(
    () => {
      const contentTitles = {
        [ContentTypes.Article]: t('content:newArticleTitle'),
        [ContentTypes.Record]: t('content:newRecordTitle'),
        [ContentTypes.New]: t('content:newNewTitle'),
        [ContentTypes.Task]: t('content:newTaskTitle'),
      };

      return contentTitles[type] || t('content:new');
    },
    [t, type]
  );

  const scope = contentScopes[type];

  return (
    <>
      {!isPreview && scopes[scope]?.create && <Typography variant='h3'>{title}</Typography>}
      {!isPreview && scopes[scope]?.create
        ? <ContentForm type={type} />
        : <ContentPreview type={type} scope={scope} />
      }
    </>
  );
};
