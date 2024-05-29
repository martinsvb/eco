import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ContentTypes } from '@eco/types';
import AppDialog, { useDialog } from '../../components/dialog/AppDialog';
import ContentForm from '../ContentForm';
import { useMobileDetection } from '../../hooks';
import AppIconButton from '../../components/buttons/AppIconButton';

const TaskAddButton = () => {

  const { open, handleClickOpen, handleClose } = useDialog();

  const { t } = useTranslation();

  const isMobile = useMobileDetection();

  return (
    <>
      <AppIconButton
        title={t('content:addTask')}
        id="task-add-button"
        onClick={handleClickOpen}
        color="primary"
        sx={{
          mr: 0.5
        }}
      ><AddIcon /></AppIconButton>
      <AppDialog
        actions={
          <Button
            autoFocus
            id="task-add-button-close"
            onClick={handleClose}
          >
            {t('labels:close')}
          </Button>
        }
        id="content-delete"
        dialogTitle={t('content:task-add-title')}
        contentText={
          <ContentForm
            type={ContentTypes.Task}
            handleDialogClose={handleClose}
          />
        }
        open={open}
        sx={!isMobile
          ? {
            '& .MuiDialog-paper': {
              maxWidth: 800
            }
          }
          : undefined
        }
      />
    </>
  );
}

export default TaskAddButton;
