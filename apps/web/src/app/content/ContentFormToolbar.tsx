import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import DoneIcon from '@mui/icons-material/Done';
import GradingIcon from '@mui/icons-material/Grading';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  apiApproveContent,
  selectIsContentsLoading,
  selectUserAuth,
  setContentPreview,
  setContentTemp,
  useAppDispatch,
  useAppSelector,
  useShallowEqualSelector
} from '@eco/redux';
import { ApiOperations, ContentData, ContentFull, ContentTypes, contentScopes } from '@eco/types';
import { useMobilePortraitDetection } from '../hooks';

interface ContentFormToolbarProps extends Partial<ContentFull> {
  data: ContentData;
  type: ContentTypes;
  handleDialogClose?: () => void;
}

export const ContentFormToolbar = memo(({
  data,
  id: contentId,
  isApproved,
  published,
  type,
  handleDialogClose
}: ContentFormToolbarProps) => {

  const { t } = useTranslation();

  const { id } = useParams();

  const isMobilePortrait = useMobilePortraitDetection();

  const dispatch = useAppDispatch();

  const { rights: { scopes } } = useShallowEqualSelector(selectUserAuth);

  const isApprovalLoading = useAppSelector(
    (state) => selectIsContentsLoading(state, type, ApiOperations.approve)
  );

  const handlePreviewClick = useCallback(
    () => {
      if (!id) {
        dispatch(setContentTemp({data, type}));
      }
      dispatch(setContentPreview(true));
    },
    [dispatch, data, id, type]
  );

  const handleApprove = useCallback(
    () => {
      if (id) {
        dispatch(
          apiApproveContent({
            approve: !isApproved,
            id,
            type,
          })
        );
      }
    },
    [dispatch, isApproved, id, type]
  );

  const scope = contentScopes[type];

  return (
    <Stack
      px={2}
      my={1}
      width={isMobilePortrait ? '100%' : 800}
      direction="row"
      justifyContent="flex-end"
    >
      {!handleDialogClose &&
        <Button
          id='content-preview-button'
          startIcon={<VisibilityIcon />}
          onClick={handlePreviewClick}
        >
          {t('labels:preview')}
        </Button>
      }
      {!published && scopes[scope]?.approve && contentId &&
        <LoadingButton
          id="content-approve-button"
          loading={isApprovalLoading}
          startIcon={isApproved ? <DoDisturbOnIcon /> : <GradingIcon />}
          onClick={handleApprove}
          color={isApproved ? 'warning' : 'success'}
          variant="contained"
          sx={{
            ml: 1
          }}
        >
          {isApproved ? t('labels:unapprove') : t('labels:approve')}
        </LoadingButton>
      }
      {published &&
        <Button
          disabled
          id='content-published-button'
          startIcon={<DoneIcon />}
          sx={{
            ml: 1
          }}
        >
          {t('labels:published')}
        </Button>
      }
    </Stack>
  );
});
