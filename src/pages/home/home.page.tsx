import React from 'react';
import Container from '@mui/material/Container';
import SignupForm from './components/signupForm.cmp';

function Home() {
  return (
    <Container sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '35prepared the sign-in form UI %',
    }}
    >
      <SignupForm />
    </Container>
  );
}

export default Home;
