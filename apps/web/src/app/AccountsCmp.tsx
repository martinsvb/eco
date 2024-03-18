import { MouseEventHandler, useCallback } from 'react';
import { useShallowEqualSelector, useAppDispatch, selectAccounts, apiGetAccounts } from '@eco/redux';
import LoginWrapper from './user/LoginWrapper';

export const AccountsCmp = () => {
  const dispatch = useAppDispatch();

  const accounts = useShallowEqualSelector(selectAccounts)

  const handleSubmit = useCallback<MouseEventHandler<HTMLButtonElement>>(
    async (event) => {
      event.preventDefault();
      dispatch(apiGetAccounts(''));
    },
    [dispatch]
  );

  return (
    <LoginWrapper>
      <div style={{display: 'flex', flexDirection: 'column', width: '200px', marginBottom: '8px', justifyContent: 'space-between'}}>
        <button type="submit" onClick={handleSubmit}>
          Load accounts
        </button>
        {accounts.length > 0 &&
          <div><pre>{JSON.stringify(accounts, undefined, 2)}</pre></div>
        }
      </div>
    </LoginWrapper>
  );
};
