import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Fab, IconButton, Stack, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import { routes } from '@eco/config';
import {
  useShallowEqualSelector,
  useAppDispatch,
  selectContentList,
  apiGetContentList,
  selectIsUserLoggedIn,
  useAppSelector,
} from '@eco/redux';
import { ContentTypes } from '@eco/types';
import { Buttons } from '../components/buttons/Buttons';
import LoginWrapper from '../user/LoginWrapper';
import { TaskList } from './TaskList';

interface ContentListProps {
  type: ContentTypes;
}

export const ContentList = ({type}: ContentListProps) => {

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const { data, isLoading, loaded } = useShallowEqualSelector((state) => selectContentList(state, type));

  useEffect(
    () => {
      if (isUserLoggedIn && !loaded) {
        dispatch(apiGetContentList({type}));
      }
    },
    [isUserLoggedIn, loaded, dispatch, type]
  );

  const handleNew = useCallback(
    () => {
      navigate(`${routes.base}${routes.content[type].new}`);
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
      <LoginWrapper>
        <>
          {type === ContentTypes.Task &&
            <TaskList data={data} />
          }
          <Buttons>
            {isLoading ?
              <CircularProgress
                sx={{
                  alignSelf: 'baseline'
                }}
              />
              :
              isUserLoggedIn && 
                <Stack alignItems='center'>
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
                  <Fab
                    aria-label={t('content:createTask')}
                    onClick={handleNew}
                    color='primary'
                  >
                    <AddIcon />
                  </Fab>
                </Stack>
            }
          </Buttons>
        </>
      </LoginWrapper>
    </>
  );
};
