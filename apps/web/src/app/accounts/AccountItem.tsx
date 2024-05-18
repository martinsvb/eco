import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Account } from '@prisma/client';
import { Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { routes } from '@eco/config';
import { useShallowEqualSelector, selectUserAuth } from '@eco/redux';
import AccountDeleteButton from './AccountDeleteButton';
import { AppCard } from '../components/card/AppCard';
import AppIconButton from '../components/buttons/AppIconButton';

export const AccountItem = ({id, name, iban, currency}: Account) => {

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { rights: { scopes: { accounts } } } = useShallowEqualSelector(selectUserAuth);

  const handleEdit = useCallback(
    () => {
      navigate(routes.accountsEdit.replace(':id', id));
    },
    [navigate, id]
  );

  return (
    <AppCard
      actions={
        <>
          {accounts.edit &&
            <AppIconButton
              title={t('labels:edit')}
              id='accountEdit'
              onClick={handleEdit}
            ><EditIcon /></AppIconButton>
          }
          {accounts.delete && <AccountDeleteButton id={id} />}
        </>
      }
      actionsAvailable={accounts.edit || accounts.delete}
      cardTitle={name}
      textContent={iban}
      label={<Chip label={currency} />}
    />
  );
};
