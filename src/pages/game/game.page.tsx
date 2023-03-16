import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import Table from '@mui/material/Table/Table';
import TableHead from '@mui/material/TableHead/TableHead';
import TableRow from '@mui/material/TableRow/TableRow';
import TableCell from '@mui/material/TableCell/TableCell';
import TableBody from '@mui/material/TableBody/TableBody';
import Paper from '@mui/material/Paper/Paper';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { getGame } from '../../config/api';
import { IGame } from '../../interfaces/games.interface';

function Game() {
  const { gameId } = useParams();
  const id = gameId || '';
  const {
    data,
  } = useQuery<IGame>({
    queryKey: ['game', id],
    queryFn: () => getGame(id),
    keepPreviousData: true,
  });
  const isWaiting = !data?.second_player;
  const p1 = data?.first_player?.username || '';
  const p2 = data?.second_player?.username || '-';

  return (
    <div>
      <Box sx={{ margin: '48px' }}>
        <TableContainer sx={{ maxWidth: 650 }} component={Paper}>
          <Table aria-label="caption table">
            <caption style={{ textTransform: 'capitalize', fontWeight: 500 }}>
              Status:&nbsp;
              {data?.status}
            </caption>
            <TableHead>
              <TableRow>
                <TableCell>First player</TableCell>
                <TableCell align="right">Second player</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ textTransform: 'capitalize' }} component="th" scope="row">
                  {p1}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }} align="right">{p2}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {isWaiting && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CircularProgress size={24} />
          <Typography sx={{ padding: '16px' }} variant="body1">Waiting for a second player to start the game...</Typography>
        </Box>
        )}
      </Box>
    </div>
  );
}

export default Game;
