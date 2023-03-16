import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Box/Box';
import Box from '@mui/material/Container/Container';
import Button from '@mui/material/Button/Button';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { useAuth } from '../../context/auth.context';
import RankingsPage from './rankings/rankings.page';
import GamesPage from './games/games.page';

const TABS = {
  games: 'games',
  rankings: 'rankings',
};

function Dashboard() {
  const [value, setValue] = useState(TABS.games);
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const { tab, page } = useParams();

  // TODO: persist the 'page' value to prevent loosing the page counter when switching between tabs
  const handleChange = (newValue: string) => {
    navigate(`/dashboard/${newValue}/0`, { replace: true });
    setValue(newValue);
  };

  // set tab's value on initial render based on path
  useEffect(() => {
    if ((tab && page) && (tab in TABS)) {
      setValue(tab);
    }
  }, []);

  return (
    <Box>
      <TabContext value={value}>
        <Container sx={{
          display: 'flex', justifyContent: 'space-between', margin: '64px auto',
        }}
        >
          <Box>
            <TabList onChange={(e, newVal) => handleChange(newVal)} aria-label="tab-list">
              <Tab value={TABS.games} sx={{ padding: '0 64px', fontSize: '1rem' }} label="Games" />
              <Tab value={TABS.rankings} sx={{ padding: '0 64px', fontSize: '1rem' }} label="Ranking list" />
            </TabList>
          </Box>
          <Button
            onClick={handleLogout}
            sx={{ fontSize: '1rem', padding: '0 32px' }}
            size="large"
          >
            Logout
          </Button>
        </Container>
        <Box>
          <TabPanel sx={{ padding: '0' }} value={TABS.games}><GamesPage /></TabPanel>
          <TabPanel sx={{ padding: '0' }} value={TABS.rankings}><RankingsPage /></TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}

export default Dashboard;
