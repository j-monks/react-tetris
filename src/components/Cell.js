import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from '../tetrominos';


const Cell = ({ type }) => (
    <StyledCell type={type} color={TETROMINOS[type].color} />
)

export default Cell;

//GRABBING THE TETROMINO SHAPE AND COLOR FROM TETRMONIS