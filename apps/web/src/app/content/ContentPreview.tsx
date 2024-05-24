import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { Chip, Paper, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { selectContent, selectUserAuth, setContentPreview, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { ContentTypes } from '@eco/types';
import { useMobilePortraitDetection } from '../hooks/useMobileDetection';
import AppIconButton from '../components/buttons/AppIconButton';

interface ContentPreviewProps {
  type: ContentTypes;
}

const ContentPreview = ({type}: ContentPreviewProps) => {

  const { t } = useTranslation();

  const isMobilePortrait = useMobilePortraitDetection();

  const dispatch = useAppDispatch();

  const { rights: { scopes: { tasks } } } = useShallowEqualSelector(selectUserAuth);

  const { data } = useShallowEqualSelector((state) => selectContent(state, type));

  const handleEditClick = useCallback(
    () => {
      dispatch(setContentPreview(false));
    },
    [dispatch]
  );

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
          <Chip
            label={dayjs(data?.dateTime).format('DD. MM. YYYY')}
          />
        </Stack>
        {tasks.edit &&
          <Stack
            p={1}
            mt={2}
            alignSelf="baseline"
          >
            <AppIconButton
              title={t('labels:edit')}
              id='content-edit-button'
              onClick={handleEditClick}
            >
              <EditIcon />
            </AppIconButton>
          </Stack>
        }
      </Stack>
      <Paper
        sx={{
          width: isMobilePortrait ? '100%' : 800,
          minHeight: 700
        }}
      >
        <Typography variant="body1">{data?.title}</Typography>
      </Paper>
    </Stack>
  );
};

export default ContentPreview;
