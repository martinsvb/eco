import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Account } from '@prisma/client';
import { Chip, Stack, Typography, useTheme } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { routes } from '@eco/config';
import { useShallowEqualSelector, selectUserAuth } from '@eco/redux';
import AccountDeleteButton from './AccountDeleteButton';
import { AppCard, AppIconButton } from '../components';
import AccountSwitch from './AccountSwitch';

export const AccountItem = ({id, name, iban, number, bic, currency, active}: Account) => {

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { typography } = useTheme();

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
          {accounts.read && !accounts.edit && (
            active
              ? <Chip icon={<CheckIcon />} label={t('accounts:active')} variant="outlined" color="success" />
              : <Chip icon={<ClearIcon />} label={t('accounts:inActive')} variant="outlined" color="error" />
          )}
          {accounts.edit &&
            <>
              <AccountSwitch
                id={id}
                active={active}
              />
              <AppIconButton
                title={t('labels:edit')}
                id='accountEdit'
                onClick={handleEdit}
              ><EditIcon /></AppIconButton>
            </>
          }
          {accounts.delete && <AccountDeleteButton id={id} />}
        </>
      }
      actionsAvailable={accounts.read || accounts.edit || accounts.delete}
      cardTitle={name}
      cmpContent={
        <Stack>
          <Typography fontWeight={typography.fontWeightBold} mb={2}>{t('labels:accountNumber')}: {number}</Typography>
          <Typography>{t('labels:iban')}: {iban}</Typography>
          <Typography>{t('labels:bic')}: {bic}</Typography>
        </Stack>
      }
      label={<Chip label={currency} />}
    />
  );
};
