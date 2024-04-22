import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Fab, IconButton, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import { routes } from '@eco/config';
import { useShallowEqualSelector, useAppDispatch, selectContentList, apiGetContentList } from '@eco/redux';
import { contentScopes, ContentTypes } from '@eco/types';
import { Buttons } from '../components/buttons/Buttons';
import { TaskList } from './TaskList';

interface ContentListProps {
  type: ContentTypes;
}

export const ContentList = ({type}: ContentListProps) => {

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { data, isLoading, loaded } = useShallowEqualSelector((state) => selectContentList(state, type));

  useEffect(
    () => {
      if (!loaded) {
        dispatch(apiGetContentList({type}));
      }
    },
    [loaded, dispatch, type]
  );

  const handleNew = useCallback(
    () => {
      navigate(routes.content[type].new);
    },
    [navigate, type]
  );

  const handleRefresh = useCallback(
    () => {
      dispatch(apiGetContentList({type}));
    },
    [dispatch, type]
  );

  return (
    <>
      <Typography variant='h3' mb={3}>{t('content:title')}</Typography>
      <>
        {type === ContentTypes.Task &&
          <TaskList data={data} />
        }
        <Buttons
          isLoading={isLoading}
          scope={contentScopes[type]}
          refreshButton={
            <IconButton
              aria-label={t('content:refresh')}
              onClick={handleRefresh}
              size='large'
              sx={{
                mb: 2
              }}
            >
              <RefreshIcon />
            </IconButton>
          }
          createButton={
            <Fab
              aria-label={t('content:createTask')}
              onClick={handleNew}
              color='primary'
            >
              <AddIcon />
            </Fab>
          }
        />
      </>
    </>
  );
};
