import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { styled, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button/Button';

function SignupForm() {
  const {
    handleSubmit, watch, control,
  } = useForm();
  const onSubmit = (data: any) => data;

  return (
    <Form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box>
        <Typography sx={{ margin: '6px 0' }} variant="h4">Welcome!</Typography>
        <Typography sx={{ margin: '0 0 32px 0' }} variant="h5">Let&apos;s create your account</Typography>
      </Box>
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            error={!!error}
            onChange={onChange}
            value={value}
            required
            id="outlined-required"
            label="Email"
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
            id="outlined-required"
            label="Repeat password"
            helperText={error?.message}
            sx={{ mb: 4 }}
          />
        )}
      />
      <Buttons>
        <Button sx={{ width: '45%' }} variant="outlined" size="large">Cancel</Button>
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
