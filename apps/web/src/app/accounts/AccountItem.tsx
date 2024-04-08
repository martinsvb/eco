import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Account } from '@prisma/client';
import { Chip, IconButton, Tooltip, alpha, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { routes } from '@eco/config';
import ms from 'ms';
import AccountDeleteButton from './AccountDeleteButton';
import { AppCard } from '../components/card/AppCard';

export const AccountItem = ({id, name, iban, currency}: Account) => {

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { palette } = useTheme();
 
  const handleEdit = useCallback(
    () => {
      navigate(`${routes.base}${routes.accountsEdit.replace(':id', id)}`);
    },
    [navigate, id]
  );

  return (
    <AppCard
      actions={
        <>
          <Tooltip
            title={t('labels:edit')}
            enterDelay={ms('0.1s')}
          >
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <AccountDeleteButton id={id} />
        </>
      }
      cardTitle={name}
      cardContent={iban}
      background={alpha(palette.info.light, .5)}
      label={<Chip label={currency} />}
    />
  );
};
