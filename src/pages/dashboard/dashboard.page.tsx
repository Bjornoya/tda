import React from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs/Tabs';
import Container from '@mui/material/Container/Container';
import Button from '@mui/material/Button/Button';
import { useAuth } from '../../context/auth.context';

function Dashboard() {
  const [value, setValue] = React.useState(0);
  const { handleLogout } = useAuth();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container sx={{
      display: 'flex', justifyContent: 'space-between', margin: '64px auto',
    }}
    >
      <Tabs value={value} onChange={handleChange}>
        <Tab sx={{ padding: '0 64px', fontSize: '1rem' }} label="Games" />
        <Tab sx={{ padding: '0 64px', fontSize: '1rem' }} label="Ranking list" />
      </Tabs>
      <Button
        onClick={handleLogout}
        sx={{ fontSize: '1rem', padding: '0 32px' }}
        size="large"
      >
        Logout
      </Button>
    </Container>
  );
}

export default Dashboard;
