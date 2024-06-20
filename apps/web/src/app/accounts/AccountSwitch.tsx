import { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Tooltip } from '@mui/material';
import ms from 'ms';
import { apiPatchAccount, useAppDispatch } from '@eco/redux';

interface AccountSwitchProps {
  id: string;
  active: boolean;
}

const AccountSwitch = ({id, active}: AccountSwitchProps) => {

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      dispatch(apiPatchAccount({
        body:{
          active: checked
        },
        id,
      }));
    },
    [dispatch, id]
  );

  return (
    <Tooltip
      title={
        active
          ? t('accounts:active')
          : t('accounts:inActive')
      }
      enterDelay={ms('0.1s')}
    >
      <Switch
        checked={active}
        onChange={handleChange}
        id="account-switch"
        inputProps={{
          'aria-label': t('accounts:activeSwitch')
        }}
      />
    </Tooltip>
  );
}

export default AccountSwitch;
