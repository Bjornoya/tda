import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Omit from 'lodash.omit';
import { styled, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button/Button';
import { useAuth } from '../../../context/auth.context';
import { useNotification } from '../../../context/notification.context';
import { loginUser, registerUser } from '../../../config/api';
import { IForm, ISignUpFields } from '../home.interface';

function SignupForm({ onClick }: IForm) {
  const {
    handleSubmit, watch, control,
  } = useForm<ISignUpFields>();
  const { handleLogin } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();

  async function onSubmit(data: ISignUpFields) {
    try {
      const fields = Omit(data, 'repeatPassword');
      await registerUser(fields);
      const response = await loginUser(fields); // automatically login with user's data
      const authData = await response.json();
      handleLogin(authData);
      notify.success('Your account has been successfully created!');
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
      <Box>
        <Typography sx={{ margin: '6px 0' }} variant="h4">Welcome!</Typography>
        <Typography sx={{ margin: '0 0 32px 0' }} variant="h5">Let&apos;s create your account</Typography>
      </Box>
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
            sx={{ mb: 4 }}
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
            sx={{ mb: 4 }}
          />
        )}
      />
      <Controller
        name="repeatPassword"
        control={control}
        rules={{
          required: 'This field is required',
          validate: (val: string) => {
            if (watch('password') !== val) return 'Passwords do not match!';
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            error={!!error}
            onChange={onChange}
            value={value}
            required
            type="password"
            id="outlined-required"
            label="Repeat password"
            helperText={error?.message}
            sx={{ mb: 4 }}
          />
        )}
      />
      <Buttons>
        <Button
          onClick={onClick}
          sx={{ width: '45%' }}
          variant="outlined"
          size="large"
        >
          Cancel
        </Button>
        <Button type="submit" sx={{ width: '45%' }} variant="contained" size="large">Create</Button>
      </Buttons>
    </Form>
  );
}

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Buttons = styled('div')`
  display: flex;
  justify-content: space-between;
  height: 48px;
`;

export default SignupForm;
