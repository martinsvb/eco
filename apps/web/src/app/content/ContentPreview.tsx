import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { Chip, Paper, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  selectContent,
  selectContentPreview,
  selectUserAuth,
  setContentPreview,
  useAppDispatch,
  useAppSelector,
  useShallowEqualSelector
} from '@eco/redux';
import { ContentFull, ContentTypes } from '@eco/types';
import { useMobilePortraitDetection } from '../hooks/useMobileDetection';
import AppIconButton from '../components/buttons/AppIconButton';
import { useHtml } from '../hooks/useHtml';

interface ContentPreviewProps {
  type: ContentTypes;
}

const DateLabel = ({createdAt, dateTime}: ContentFull) => {
  const { t } = useTranslation();

  const label = useMemo(
    () => {
      return dateTime ? t('labels:dateTime') : t('labels:createdAt');
    },
    [dateTime, t]
  )

  return `${label}: ${dayjs(dateTime || createdAt).format('DD. MM. YYYY')}`;
}

const ContentPreview = ({type}: ContentPreviewProps) => {

  const { t } = useTranslation();

  const navigate = useNavigate();

  const isMobilePortrait = useMobilePortraitDetection();

  const dispatch = useAppDispatch();

  const { rights: { scopes: { tasks } } } = useShallowEqualSelector(selectUserAuth);

  const isPreview = useAppSelector(selectContentPreview);

  const { data } = useShallowEqualSelector((state) => selectContent(state, type));

  const handleCloseClick = useCallback(
    () => {
      if (isPreview) {
        dispatch(setContentPreview(false));
      }
      if (!tasks.edit) {
        navigate(-1);
      }
    },
    [dispatch, navigate, tasks, isPreview]
  );

  const innerHtml = useHtml(data?.text);

  return (
    <Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width={isMobilePortrait ? '100%' : 800}
        >
          <Typography variant="h3" mb={2}>{data?.title}</Typography>
          {data &&
            <Chip
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
          minHeight: 700,
          p: 2
        }}
        dangerouslySetInnerHTML={innerHtml}
      />
    </Stack>
  );
};

export default ContentPreview;
