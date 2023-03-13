import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  styled, Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button/Button';
import { useAuth } from '../../../context/auth.context';
import { useNotification } from '../../../context/notification.context';
import { loginUser } from '../../../config/api';
import { ILoginFields, IForm } from '../home.interface';

function LoginForm({ onClick }: IForm) {
  const {
    handleSubmit, control,
  } = useForm<ILoginFields>();
  const { handleLogin } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();

  async function onSubmit(fields: ILoginFields) {
    try {
      const response = await loginUser(fields);
      const authData = await response.json();
      handleLogin(authData);
      notify.success('You have successfully logged in!');
      navigate('/dashboard');
    } catch (e: any) {
      notify.error(e.message || 'Something went wrong...');
    }
  }

  return (
    <Form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography sx={{ margin: '0 0 32px 0' }} variant="h4">Login</Typography>
      <Controller
        name="username"
        control={control}
        rules={{
          required: 'Username is required',
          pattern: {
            value: /[A-Za-z0-9]/i,
            message: 'Wrong username format!',
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            error={!!error}
            onChange={onChange}
            value={value}
            required
            id="outlined-required"
            label="Username"
            helperText={error?.message}
            InputLabelProps={{
              style: { color: 'rgba(0, 0, 0, 0.6)' },
            }}
            sx={{ mb: 4, width: '100%' }}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{
          required: 'Password is required',
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            error={!!error}
            onChange={onChange}
            value={value}
            required
            type="password"
            id="outlined-required"
            label="Password"
            helperText={error?.message}
            sx={{ mb: 4, width: '100%' }}
          />
        )}
      />
      <Buttons>
        <Button type="submit" sx={{ width: '100%', height: '48px' }} variant="contained" size="large">Login</Button>
      </Buttons>
      <Typography sx={{ margin: '16px 0 0 0', textAlign: 'center' }} variant="subtitle1">
        Not a member?
        <PseudoLink onClick={onClick}>Sign up</PseudoLink>
      </Typography>
    </Form>
  );
}

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Buttons = styled('div')`
  width: 100%;
`;

const PseudoLink = styled('span')`
  color: ${({ theme }) => (theme.palette.primary.main)};
  cursor: pointer;
  margin: 0 0 0 6px;
} 
`;

export default LoginForm;
