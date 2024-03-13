import { MouseEventHandler, useCallback } from 'react';
import { selectUsers, useAppDispatch, useShallowEqualSelector, apiGetUsers } from '@eco/redux';

export const Users = () => {

  const users = useShallowEqualSelector(selectUsers);

  const dispatch = useAppDispatch();

  const handleSubmit = useCallback<MouseEventHandler<HTMLButtonElement>>(
    async (event) => {
      event.preventDefault();
      dispatch(apiGetUsers(''));
    },
    [dispatch]
  );

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '200px', justifyContent: 'space-between'}}>
      <button type="submit" onClick={handleSubmit}>
        Load users
      </button>

      {users.length > 0 &&
        <div><pre>{JSON.stringify(users, undefined, 2)}</pre></div>
      }
    </div>
  );
};
