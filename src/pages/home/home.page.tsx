import React, { useState } from 'react';
import Container from '@mui/material/Container';
import SignupForm from './components/signupForm.cmp';
import LoginForm from './components/loginForm.cmp';

function Home() {
  const [hasAccount, setHasAccount] = useState(true);
  const onViewUpdate = () => setHasAccount(!hasAccount);

  return (
    <Container sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '35%',
    }}
    >
      {hasAccount ? <LoginForm onClick={onViewUpdate} /> : <SignupForm onClick={onViewUpdate} /> }
    </Container>
  );
}

export default Home;
