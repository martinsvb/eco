import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Fab, IconButton, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import { routes } from '@eco/config';
import { useShallowEqualSelector, useAppDispatch, selectContentList, apiGetContentList } from '@eco/redux';
import { contentScopes, ContentTypes } from '@eco/types';
import { Buttons } from '../components/buttons/Buttons';
import { TaskList } from './tasks/TaskList';
import Records from './records/Records';
import { useMobileDetection } from '../hooks';

interface ContentListProps {
  type: ContentTypes;
}

export const ContentList = ({type}: ContentListProps) => {

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isMobile = useMobileDetection();

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

  const titles = useMemo(
    () => {
      return {
        [ContentTypes.Record]: t('records'),
        [ContentTypes.Task]: t('content:tasks', {length: data.length}),
      } as {[key: string]: string}
    },
    [t, data]
  );

  return (
    <Box px={isMobile ? undefined : 2}>
      <Typography variant='h3' mb={3}>{titles[type]}</Typography>
      <>
        {type === ContentTypes.Record &&
          <Records data={data} isLoading={isLoading} />
        }
        {type === ContentTypes.Task &&
          <TaskList
            data={data}
            expandedDone
            expandedInProgress
          />
        }
        <Buttons
          isLoading={isLoading}
          scope={contentScopes[type]}
          refreshButton={
            <IconButton
              aria-label={t('labels:refresh')}
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
    </Box>
  );
};
