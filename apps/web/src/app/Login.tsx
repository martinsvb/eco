import { ChangeEventHandler, MouseEventHandler, useCallback, useState } from 'react';
import { User } from '@prisma/client';
import { endPoints } from '@eco/config';
import { Auth } from '@eco/types';
import { prepareFetchHeaders, HTTP_METHODS } from '../api/configuration';
import { checkResponse } from '../api/error/checkResponse';

export const Login = () => {

  const [loginData, setLoginData] = useState({email: '', password: ''});

  const [users, setUsers] = useState<User[]>([]);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({...prevData, [name]: value}));
  }, []);


  const handleSubmit = useCallback<MouseEventHandler<HTMLButtonElement>>(
    async (event) => {
      event.preventDefault();

      try {
        const response = await fetch(
          `/api/${endPoints.login}`,
          prepareFetchHeaders(HTTP_METHODS.POST, {body: loginData})
        );

        checkResponse(response);

        const data: Auth = await response.json();

        try {
          const response = await fetch(
            `/api/${endPoints.users}`,
            prepareFetchHeaders(HTTP_METHODS.GET, {token: data.accessToken})
          );
  
          checkResponse(response);
          setUsers(await response.json());
        } catch (error) {
          console.log({ error });
        }
      } catch (error) {
        console.log({ error });
      }
    },
    [loginData]
  );

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '200px', height: '80px', justifyContent: 'space-between'}}>
      <input name='email' onChange={handleChange} />
      <input name='password' type='password' onChange={handleChange} />

      <button type="submit" disabled={!loginData.email && ! loginData.password} onClick={handleSubmit}>
        Log in
      </button>

      {users.length > 0 &&
        <div><pre>{JSON.stringify(users, undefined, 2)}</pre></div>
      }
    </div>
  );
};
