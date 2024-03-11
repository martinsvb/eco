import { useEffect, useState } from 'react';
import { endPoints } from '@eco/config';
import { Account } from '@prisma/client';
import { AccountCmp } from './AccountCmp';
import { AccountsCmp } from './AccountsCmp';
import { SocketCmp } from './SocketCmp';
import { GoogleAccount } from './GoogleLogin';
import { Login } from './Login';
import { selectAccessToken, useShallowEqualSelector } from '@eco/redux';
import { Users } from './Users';

export function App() {
  const [account, setAccount] = useState<Account>({
    id: '',
    name: '',
    iban: '',
    description: null,
    active: false,
    ownerId: 'testId',
    createdAt: new Date(),
    updatedAt: null,
  });

  const accessToken = useShallowEqualSelector(selectAccessToken);

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const response = await fetch(`/api/${endPoints.account}`);
        const data = await response.json();
        setAccount(data);
      } catch (error) {
        console.log({ error });
      }
    };
    loadAccount();
  }, []);

  return (
    <div style={{ padding: 8 }}>
      <GoogleAccount />
      <Login />
      <AccountCmp {...account} />
      {!!accessToken && <SocketCmp accessToken={accessToken} />}
      <AccountsCmp />
      <Users />
    </div>
  );
}

export default App;
