import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import { getUsers } from '../../../config/api';
import {
  getPageCount, INITIAL_PAGE, makeEmptyRows, STEP_SIZE,
} from '../dashboard.utils';
import { IUsers } from './rankings.interface';

function Rankings() {
  const { tab, page } = useParams();
  const navigate = useNavigate();
  const currentPage = Number(page || INITIAL_PAGE);
  const offset = currentPage * STEP_SIZE;

  const {
    data,
  } = useQuery<IUsers>({
    queryKey: ['users', currentPage],
    queryFn: () => getUsers(offset),
    keepPreviousData: true,
  });

  const pageCount = getPageCount(data?.count);
  const emptyRows = makeEmptyRows(currentPage, data?.count);

  const onPageChange = (pageNumber: number) => navigate(`/dashboard/${tab}/${pageNumber - 1}`, { replace: true });

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="center">Games played</TableCell>
              <TableCell align="center">Win rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.results.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.username}
                </TableCell>
                <TableCell align="center">{user.game_count}</TableCell>
                <TableCell align="center">{user.win_rate.toFixed(3)}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
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

export default Rankings;
