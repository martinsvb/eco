import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ms from 'ms';
import { routes } from '@eco/config';
import { ContentTypes } from '@eco/types';

interface ContentEditButtonProps {
  id: string;
  type: ContentTypes;
}

export const ContentEditButton = ({id, type}: ContentEditButtonProps) => {

  const { t } = useTranslation();

  const navigate = useNavigate();
 
  const handleEdit = useCallback(
    () => {
      const pathname = routes.content[type].edit;
      navigate(`${routes.base}${pathname.replace(':id', id)}`);
    },
    [navigate, id, type]
  );

  return (
    <Tooltip
      title={t('labels:edit')}
      enterDelay={ms('0.1s')}
    >
      <IconButton onClick={handleEdit}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};
