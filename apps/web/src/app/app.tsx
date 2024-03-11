import { AccountCmp } from './AccountCmp';
import { AccountsCmp } from './AccountsCmp';
import { SocketCmp } from './SocketCmp';
import { GoogleAccount } from './GoogleLogin';
import { Login } from './Login';
import { selectAccessToken, useShallowEqualSelector } from '@eco/redux';
import { Users } from './Users';

export function App() {

  const accessToken = useShallowEqualSelector(selectAccessToken);

  return (
    <div style={{ padding: 8 }}>
      <GoogleAccount />
      <Login />
      <AccountCmp />
      {!!accessToken && <SocketCmp accessToken={accessToken} />}
      <AccountsCmp />
      <Users />
    </div>
  );
}

export default App;
