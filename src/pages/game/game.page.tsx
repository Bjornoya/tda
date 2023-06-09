import React, { useEffect, useState } from 'react';
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
import { getGame, makeMove } from '../../config/api';
import { IGame } from '../../interfaces/games.interface';
import Board from './components/board.cmp';
import { useAuth } from '../../context/auth.context';

export const initialBoardState = {
  squares: Array(9).fill(null),
};

function Game() {
  const [intervalMs, setIntervalMs] = useState(2000);
  const [{ squares }, setState] = useState(initialBoardState);
  const { gameId } = useParams();
  const { user } = useAuth();
  const id = gameId || '';
  const {
    data,
    refetch,
  } = useQuery<IGame>({
    queryKey: ['game', id],
    queryFn: () => getGame(id),
    keepPreviousData: true,
    refetchInterval: intervalMs,
  });
  const isWaiting = !data?.second_player;
  const isFinished = data?.status === 'finished';
  const isParticipant = user.id === data?.first_player?.id || user.id === data?.second_player?.id;
  const p1 = data?.first_player;
  const p2 = data?.second_player;
  // @ts-ignore:next-line
  // eslint-disable-next-line
  const currentPlayer = data ? data[whoIsNext()] : '';
  const isMyTurn = currentPlayer?.id === user.id;
  const readOnly = isWaiting || isFinished || !isParticipant || !isMyTurn;

  function whoIsNext() {
    let firstPlayer = 0;
    let secondPlayer = 0;
    data?.board?.flat().forEach((square) => {
      if (square === p1?.id) {
        firstPlayer += 1;
      }
      if (square === p2?.id) {
        secondPlayer += 1;
      }
    });
    if (firstPlayer === secondPlayer) return 'first_player';
    if (firstPlayer < secondPlayer) return 'first_player';
    if (secondPlayer < firstPlayer) return 'second_player';
    return '';
  }

  const handleClick = async (idx: number) => {
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    if (gameId) {
      await makeMove(gameId, { row, col });
      await refetch();
    }
  };

  useEffect(() => {
    setState({
      squares: data?.board.flat()
        .map((square) => {
          if (square === p1?.id) return 'X';
          if (square === p2?.id) return '0';
          return square;
        }) || [],
    });
    if (data?.status === 'finished') {
      // @ts-ignore
      setIntervalMs(false);
    }
  }, [data]);

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-around',
      margin: '48px',
    }}
    >
      <Box>
        <TableContainer sx={{ width: 650 }} component={Paper}>
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
                  {p1?.username || ''}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }} align="right">{p2?.username || '-'}</TableCell>
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
        {isFinished && (
        <Typography sx={{ padding: '16px' }} variant="body1">
          Winner:&nbsp;
          {data?.winner?.username || 'draw'}
        </Typography>
        )}
      </Box>
      <Box style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Board squares={squares} onClick={handleClick} readOnly={readOnly} />
        <Typography sx={{ padding: '16px' }} variant="h5">{currentPlayer && data?.status === 'progress' ? `${currentPlayer.username.toUpperCase()} -  It's your turn` : ''}</Typography>
      </Box>
    </Box>
  );
}

export default Game;
