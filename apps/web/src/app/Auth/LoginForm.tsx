import { ChangeEventHandler, MouseEventHandler, useCallback, useState } from 'react';
import { apiPostLogin, useAppDispatch } from '@eco/redux';

export const LoginForm = () => {

  const [loginData, setLoginData] = useState({email: '', password: ''});

  const dispatch = useAppDispatch();

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({...prevData, [name]: value}));
  }, []);


  const handleSubmit = useCallback<MouseEventHandler<HTMLButtonElement>>(
    async (event) => {
      event.preventDefault();
      dispatch(apiPostLogin(loginData));
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
