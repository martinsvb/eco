import { Account } from '@prisma/client';

interface AccountsCmpProps {
  accounts: Account[];
}

export const AccountsCmp = ({ accounts }: AccountsCmpProps) => {
  return (
    <>
      <h2>Accounts</h2>
      {accounts.map(({ name, id }) => (
        <p key={id}>{name}</p>
      ))}
    </>
  );
};
