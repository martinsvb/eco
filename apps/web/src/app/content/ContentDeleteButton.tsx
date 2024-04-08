import { MouseEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import ms from 'ms';
import { useSnackbar } from 'notistack';
import { apiDeleteContent, selectIsContentsLoading, useAppDispatch, useAppSelector } from '@eco/redux';
import { ApiOperations, ContentTypes } from '@eco/types';
import AppDialog, { useDialog } from '../components/dialog/AppDialog';

interface ContentDeleteButtonProps {
  id: string;
  type: ContentTypes;
}

const ContentDeleteButton = ({id, type}: ContentDeleteButtonProps) => {

  const { open, setOpen, handleClickOpen, handleClose } = useDialog();

  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => selectIsContentsLoading(state, type, ApiOperations.deleteItem));

  const handleDelete = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      dispatch(apiDeleteContent({
        id,
        type,
        onSuccess: () => {
          enqueueSnackbar(t('content:deleted'), {variant: 'success'});
          setOpen(false);
        }
      }));
    },
    [dispatch, id]
  );

  return (
    <>
      <Tooltip
        title={t('labels:delete')}
        enterDelay={ms('0.1s')}
      >
        <IconButton
          aria-label={t('labels:delete')}
          id="content-delete-button"
          onClick={handleClickOpen}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <AppDialog
        actions={
          <>
            <Button
              autoFocus
              id="content-delete-button-close"
              onClick={handleClose}
            >
              {t('labels:close')}
            </Button>
            <LoadingButton
              id="content-delete-button-submit"
              loading={isLoading}
              type="submit"
              variant="contained"
              onClick={handleDelete}
            >
              {t('labels:delete')}
            </LoadingButton>
          </>
        }
        id="content-delete"
        dialogTitle={t('content:delete-question-title')}
        contentText={t('content:delete-question-text')}
        open={open}
      />
    </>
  );
}

export default ContentDeleteButton;
