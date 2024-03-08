import { useEffect, useState } from 'react';
import { endPoints } from '@eco/config';
import { Account } from '@prisma/client';
import { AccountCmp } from './AccountCmp';
import { AccountsCmp } from './AccountsCmp';
import { SocketCmp } from './SocketCmp';
import { GoogleAccount } from './GoogleLogin';
import { Login } from './Login';

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
  const [accounts, setAccounts] = useState<Account[]>([]);

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
    const loadAccounts = async () => {
      try {
        const response = await fetch(`/api/${endPoints.accounts}`);
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        console.log({ error });
      }
    };
    loadAccount();
    loadAccounts();
  }, []);

  return (
    <div style={{ padding: 8 }}>
      <AccountCmp {...account} />
      <AccountsCmp accounts={accounts} />
      <SocketCmp />
      <GoogleAccount />
      <Login />
    </div>
  );
}

export default App;
