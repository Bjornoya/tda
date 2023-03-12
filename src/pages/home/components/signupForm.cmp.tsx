import React from 'react';
import { styled, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button/Button';

function SignupForm() {
  return (
    <Form
      autoComplete="off"
    >
      <Box>
        <Typography sx={{ margin: '6px 0' }} variant="h4">Welcome!</Typography>
        <Typography sx={{ margin: '0 0 32px 0' }} variant="h5">Let&apos;s create your account</Typography>
      </Box>
      <TextField
        required
        id="outlined-required"
        label="Email"
        sx={{ mb: 4 }}
      />
      <TextField
        required
        id="outlined-required"
        label="Password"
        sx={{ mb: 4 }}
      />
      <TextField
        required
        id="outlined-disabled"
        label="Repeat password"
        sx={{ mb: 4 }}
      />
      <Buttons>
        <Button sx={{ width: '45%' }} variant="outlined" size="large">Cancel</Button>
        <Button sx={{ width: '45%' }} variant="contained" size="large">Create</Button>
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
