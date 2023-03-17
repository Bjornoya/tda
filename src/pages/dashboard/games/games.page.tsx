import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button/Button';
import Box from '@mui/material/Box/Box';
import CardActions from '@mui/material/CardActions/CardActions';
import {
  Card, CardActionArea, CardContent, MenuItem, Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { IGames } from '../../../interfaces/games.interface';
import {
  getPageCount, INITIAL_PAGE, STEP_SIZE, NO_VALUE, FILTERS, errorHandler,
} from '../dashboard.utils';
import { getGames, createGame, joinGame } from '../../../config/api';
import { useAuth } from '../../../context/auth.context';
import { useNotification } from '../../../context/notification.context';

function Games() {
  const { user } = useAuth();
  const { notify } = useNotification();
  const { tab, page } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = Number(page || INITIAL_PAGE);
  const offset = currentPage * STEP_SIZE;
  const activeFilter = searchParams.get('status') || '';
  const queryKey = currentPage + activeFilter;

  const {
    data,
  } = useQuery<IGames>({
    queryKey: ['games', queryKey],
    queryFn: () => getGames(offset, activeFilter),
    keepPreviousData: true,
  });

  const pageCount = getPageCount(data?.count);

  const isParticipant = (p1: string, p2: string) => user.username === p1 || user.username === p2;

  const onJoinGame = async (id: number) => {
    try {
      await joinGame(id);
      const url = `/game/${id}`;
      notify.success('Joining...');
      navigate(url, { replace: true });
    } catch (e: any) {
      notify.error(e.message);
    }
  };

  const cardButton = (hasAccess: boolean, url: string, id: number) => ({
    open: <Button onClick={() => onJoinGame(id)} size="small" color="primary">Join</Button>,
    progress: hasAccess ? <Button onClick={() => navigate(url, { replace: true })} size="small" color="primary">Return</Button> : null,
    finished: <Button onClick={() => navigate(url, { replace: true })} size="small" color="primary">Results</Button>,
  });

  const onCreateGame = async () => {
    try {
      const response = await createGame();
      const url = `/game/${response.id}`;
      notify.success('Game has been created! Joining...');
      navigate(url, { replace: true });
    } catch (e: any) {
      notify.error(e.message);
    }
  };

  const onPageChange = (pageNumber: number) => navigate(`/dashboard/${tab}/${pageNumber - 1}/${activeFilter ? `?status=${activeFilter}` : ''}`, { replace: true });

  const makeCardBackground = (board: [number[]], players: number[]) => {
    const [p1, p2] = players;
    const symbols = new Proxy({ [p1]: 'X', [p2]: '0' }, errorHandler);
    return board.map((sub) => sub.map((id) => symbols[id])).join('\r\n').replaceAll(',', ''); // 0n(square) :(
  };

  return (
    <>
      <Box sx={{
        margin: '32px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      >
        <TextField
          id="outlined-select-currency"
          select
          onChange={({ target: { value: status } }) => {
            navigate(`/dashboard/${tab}/0/${status ? `?status=${status}` : ''}`, { replace: true });
          }}
          label="Status"
          defaultValue=""
          sx={{ width: '240px' }}
          size="small"
          value={activeFilter}
        >
          {FILTERS.map((filter) => (
            <MenuItem key={filter.value} value={filter.value}>
              {filter.label}
            </MenuItem>
          ))}
        </TextField>
        <Button onClick={onCreateGame} size="large" color="primary" variant="outlined">Create game</Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
        {data?.results.map((game) => {
          const p1 = game.first_player?.username || NO_VALUE;
          const p2 = game.second_player?.username || NO_VALUE;
          const canReturn = isParticipant(p1, p2);
          return (
            <Card key={game.id} sx={{ width: 345, position: 'relative' }}>
              <CardActionArea>
                <CardContent>
                  <Typography
                    sx={{
                      whiteSpace: 'pre',
                      letterSpacing: '24px',
                      width: '84px',
                      height: 'max-content',
                      padding: '8px',
                      margin: '0 0 25px 0',
                      border: '1px solid black',
                    }}
                    variant="subtitle1"
                    color="text.secondary"
                  >
                    {makeCardBackground(
                      game.board,
                      [game.first_player?.id, game.second_player?.id],
                    )}
                  </Typography>
                  <Typography sx={{ textTransform: 'capitalize' }} gutterBottom variant="h5" component="div">
                    {p1}
                    &nbsp;
                    |
                    &nbsp;
                    {p2}
                  </Typography>
                  <Typography sx={{ textTransform: 'capitalize' }} variant="body2" color="text.secondary">
                    Winner:
                    &nbsp;
                    {game.winner?.username || NO_VALUE}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created:
                    &nbsp;
                    {game.created}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ padding: '16px', justifyContent: 'space-between', textTransform: 'capitalize' }}>
                <Typography variant="body2" color="text.secondary">
                  <span style={{ fontWeight: 500 }}>Status</span>
                  :
                  &nbsp;
                  {game.status}
                </Typography>
                {cardButton(canReturn, `/game/${game.id}`, game.id)[game.status]}
              </CardActions>
              <Typography
                sx={{
                  textTransform: 'capitalize',
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: '#1eb22882',
                  padding: '2px 6px',
                  color: '#FFF',
                  display: canReturn ? 'block' : 'none',
                }}
                variant="body2"
              >
                Participant
              </Typography>
            </Card>
          );
        })}
      </Box>
      <Pagination
        sx={{ display: 'flex', justifyContent: 'flex-end', margin: '32px 0' }}
        count={pageCount}
        page={currentPage + 1} // api starts from zero
        onChange={(e, pageInt) => onPageChange(pageInt)}
        shape="rounded"
      />
    </>
  );
}

export default Games;
