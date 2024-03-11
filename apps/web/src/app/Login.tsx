import { ChangeEventHandler, MouseEventHandler, useCallback, useState } from 'react';
import { endPoints } from '@eco/config';
import { setUserAuth, useAppDispatch } from '@eco/redux';
import { Auth } from '@eco/types';
import { prepareFetchHeaders, HTTP_METHODS } from '../api/configuration';
import { checkResponse } from '../api/error/checkResponse';

export const Login = () => {

  const [loginData, setLoginData] = useState({email: '', password: ''});

  const dispatch = useAppDispatch();

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

        dispatch(setUserAuth(data));
      } catch (error) {
        console.log({ error });
      }
    },
    [dispatch, loginData]
  );

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '200px', height: '80px', marginBottom: '8px', justifyContent: 'space-between'}}>
      <input name='email' onChange={handleChange} />
      <input name='password' type='password' onChange={handleChange} />

      <button type="submit" disabled={!loginData.email && ! loginData.password} onClick={handleSubmit}>
        Log in
      </button>
    </div>
  );
};
