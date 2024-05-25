import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { routes } from '@eco/config';
import { ContentTypes } from '@eco/types';
import { setContentPreview, useAppDispatch } from '@eco/redux';
import AppIconButton from '../components/buttons/AppIconButton';

interface ContentEditButtonProps {
  id: string;
  isEditable?: boolean;
  type: ContentTypes;
}

export const ContentEditButton = ({id, isEditable, type}: ContentEditButtonProps) => {

  const { t } = useTranslation();
  
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
 
  const handleEditClick = useCallback(
    () => {
      if (isEditable) {
        dispatch(setContentPreview(false));
      }
      navigate(routes.content[type].detail.replace(':id', id));
    },
    [dispatch, navigate, id, isEditable, type]
  );

  return (
    <AppIconButton
      title={isEditable ? t('labels:edit') : t('labels:preview')}
      id='content-edit-button'
      onClick={handleEditClick}
    >
      {isEditable ? <EditIcon /> : <VisibilityIcon />}
    </AppIconButton>
  );
};
