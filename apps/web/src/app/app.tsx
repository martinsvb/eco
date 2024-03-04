import { useEffect, useState } from 'react';
import { endPoints } from '@eco/config';
import { Account } from '@prisma/client';
import { AccountCmp } from './AccountCmp';
import { AccountsCmp } from './AccountsCmp';
import { SocketCmp } from './SocketCmp';
import { GoogleAccount } from './GoogleLogin';
import { token } from '../socket';

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
        console.log({ data, status: response.status });
        setAccount(data);
      } catch (error) {
        console.log({ error });
      }
    };
    const loadAccounts = async () => {
      try {
        const response = await fetch(`/api/${endPoints.accounts}`);
        const data = await response.json();
        console.log({ data, status: response.status });
        setAccounts(data);
      } catch (error) {
        console.log({ error });
      }
    };
    const loadUsers = async () => {
      try {
        const response = await fetch(`/api/${endPoints.users}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log({ data, status: response.status });
      } catch (error) {
        console.log({ error });
      }
    };
    loadAccount();
    loadAccounts();
    loadUsers();
  }, []);

  return (
    <div style={{ padding: 8 }}>
      <AccountCmp {...account} />
      <AccountsCmp accounts={accounts} />
      <SocketCmp />
      <GoogleAccount />
    </div>
  );
}

export default App;
