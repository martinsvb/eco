import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import { ContentTypes } from '@eco/types';
import ContentForm from '../ContentForm';
import { useMobileDetection } from '../../hooks';
import { AppDialog, AppIconButton, useDialog } from '../../components';

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
        id="content-delete"
        dialogTitle={t('content:task-add-title')}
        contentText={
          <ContentForm
          type={ContentTypes.Task}
          handleDialogClose={handleClose}
          />
        }
        open={open}
        handleClose={handleClose}
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
