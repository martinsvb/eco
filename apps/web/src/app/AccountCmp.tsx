import { useState, useEffect } from 'react';
import { Account } from '@prisma/client';
import { endPoints } from '@eco/config';

export const AccountCmp = () => {
  const [account, setAccount] = useState<Account | null>(null);

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
    <div>
      <h1>
        Account: {account?.name}, {account?.id}
      </h1>
    </div>
  );
};
