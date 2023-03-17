import React, { memo } from 'react';
import { styled } from '@mui/material';

interface ISquare {
  value: number | null;
  onClick: (idx: number) => void;
  index: number;
  readOnly: boolean;
}

const Square = memo(({
  value, onClick, index, readOnly,
}: ISquare) => (
  <StyledSquare onClick={() => (readOnly ? null : onClick(index))} readOnly={readOnly}>
    {value}
  </StyledSquare>
));

const StyledSquare = styled('div')<any>`
  cursor: ${({ readOnly }) => (readOnly ? 'not-allowed' : 'pointer')};
  background: #FFF;
  border: 1px solid #999;
  float: left;
  font-size: 56px;
  font-weight: bold;
  width: 120px;
  height: 120px;
  line-height: 120px;
  padding: 0;
  text-align: center;

  &:focus {
    position: relative;
  }
`;

export default Square;
