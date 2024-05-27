import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { Chip, Paper, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  selectContent,
  selectUserAuth,
  setContentPreview,
  useAppDispatch,
  useShallowEqualSelector
} from '@eco/redux';
import { ContentFull, ContentTypes, ScopeItems } from '@eco/types';
import { useMobilePortraitDetection } from '../hooks/useMobileDetection';
import AppIconButton from '../components/buttons/AppIconButton';
import { useHtml } from '../hooks/useHtml';

interface ContentPreviewProps {
  type: ContentTypes;
  scope: ScopeItems;
}

const DateLabel = ({createdAt, dateTime}: ContentFull) => {
  const { t } = useTranslation();

  const label = useMemo(
    () => {
      return dateTime ? t('labels:dateTime') : t('labels:createdAt');
    },
    [dateTime, t]
  );

  return (
    <Stack>
      <Typography variant="body2">{label}</Typography>
      <Typography variant="body2">{dayjs(dateTime || createdAt).format('DD. MM. YYYY')}</Typography>
    </Stack>
  );
}

const ContentPreview = ({type, scope}: ContentPreviewProps) => {

  const { t } = useTranslation();

  const navigate = useNavigate();

  const isMobilePortrait = useMobilePortraitDetection();

  const dispatch = useAppDispatch();

  const { rights: { scopes } } = useShallowEqualSelector(selectUserAuth);

  const { data: content, tempData } = useShallowEqualSelector((state) => selectContent(state, type));

  const handleCloseClick = useCallback(
    () => {
      dispatch(setContentPreview(false));
      if (!scopes[scope]?.edit) {
        navigate(-1);
      }
    },
    [dispatch, navigate, scopes, scope]
  );

  useEffect(
    () => {
      return () => {
        dispatch(setContentPreview(false));
      }
    },
    [dispatch]
  );

  const data = (tempData || content) as ContentFull;

  const innerHtml = useHtml(data?.text);

  return (
    <Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack
          direction={isMobilePortrait ? 'column' : 'row'}
          alignItems="center"
          justifyContent="space-between"
          width={isMobilePortrait ? '100%' : 800}
        >
          <Typography variant="h3" mb={2}>{data?.title}</Typography>
          {(data?.createdAt || data?.dateTime) &&
            <Chip
              sx={{
                height: '48px',
                p: 0.5
              }}
              label={<DateLabel {...data} />}
            />
          }
        </Stack>
        <Stack
          p={1}
          alignSelf="baseline"
        >
          <AppIconButton
            title={t('labels:close')}
            id='content-preview-close-button'
            onClick={handleCloseClick}
          >
            <CloseIcon />
          </AppIconButton>
        </Stack>
      </Stack>
      <Paper
        sx={{
          width: isMobilePortrait ? '100%' : 800,
          minHeight: isMobilePortrait ? 500 : 700,
          p: 2
        }}
        dangerouslySetInnerHTML={innerHtml}
      />
    </Stack>
  );
};

export default ContentPreview;
