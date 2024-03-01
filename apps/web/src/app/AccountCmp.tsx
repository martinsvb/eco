import { Account } from '@prisma/client';

interface AccountCmpProps extends Account {}

export const AccountCmp = ({ name, id }: AccountCmpProps) => {
  return (
    <div>
      <h1>
        Account: {name}, {id}
      </h1>
    </div>
  );
};
