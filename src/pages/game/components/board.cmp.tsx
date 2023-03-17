import React from 'react';
import { styled } from '@mui/material';
import Square from './square.cmp';

interface IBoard {
  squares: number[];
  onClick: (idx: number) => void;
  readOnly: boolean
}

// Array's length won't be changed. It's ok to use an index here
function Board({ squares, onClick, readOnly }: IBoard) {
  return (
    <StyledBoard>
      {squares?.map((square, i) => (
        <Square
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          index={i}
          value={square}
          onClick={onClick}
          readOnly={readOnly}
        />
      ))}
    </StyledBoard>
  );
}

const StyledBoard = styled('div')`  
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-column-gap: 0;
  grid-row-gap: 0;
  margin-bottom: 1rem;
`;

export default Board;
