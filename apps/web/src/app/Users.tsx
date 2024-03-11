import { MouseEventHandler, useCallback, useState } from 'react';
import { User } from '@prisma/client';
import { METHODS, checkResponse, endPoints, getHeaders } from '@eco/config';
import { selectAccessToken, useAppDispatch, useShallowEqualSelector } from '@eco/redux';

export const Users = () => {

  const token = useShallowEqualSelector(selectAccessToken);

  const [users, setUsers] = useState<User[]>([]);

  const dispatch = useAppDispatch();

  const handleSubmit = useCallback<MouseEventHandler<HTMLButtonElement>>(
    async (event) => {
      event.preventDefault();

      try {
        const response = await fetch(
          `/api/${endPoints.users}`,
          getHeaders(METHODS.GET, {token})
        );

        checkResponse(response);
        setUsers(await response.json());
      } catch (error) {
        console.log({ error });
      }
    },
    [dispatch, token]
  );

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '200px', justifyContent: 'space-between'}}>
      <button type="submit" disabled={!token} onClick={handleSubmit}>
        Load users
      </button>

      {users.length > 0 &&
        <div><pre>{JSON.stringify(users, undefined, 2)}</pre></div>
      }
    </div>
  );
};
