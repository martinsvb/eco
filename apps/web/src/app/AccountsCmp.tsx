import { endPoints } from '@eco/config';
import { useShallowEqualSelector, selectAccessToken } from '@eco/redux';
import { Account } from '@prisma/client';
import { useState, MouseEventHandler, useCallback } from 'react';
import { prepareFetchHeaders, HTTP_METHODS } from '../api/configuration';
import { checkResponse } from '../api/error/checkResponse';

export const AccountsCmp = () => {
  const token = useShallowEqualSelector(selectAccessToken);

  const [accounts, setAccounts] = useState<Account[]>([]);

  const handleSubmit = useCallback<MouseEventHandler<HTMLButtonElement>>(
    async (event) => {
      event.preventDefault();

      try {
        const response = await fetch(
          `/api/${endPoints.accounts}`,
          prepareFetchHeaders(HTTP_METHODS.GET, {token})
        );

        checkResponse(response);
        setAccounts(await response.json());
      } catch (error) {
        console.log({ error });
      }
    },
    [token]
  );

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '200px', marginBottom: '8px', justifyContent: 'space-between'}}>
      <button type="submit" disabled={!token} onClick={handleSubmit}>
        Load accounts
      </button>
      {accounts.length > 0 &&
        <div><pre>{JSON.stringify(accounts, undefined, 2)}</pre></div>
      }
    </div>
  );
};
