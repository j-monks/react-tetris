import React from 'react';
import { StyledCell } from "./styles/StyledCell";
import { TETROMINOS } from "../tetrominos";

const Cell = ({ type }) => (
    <StyledCell>{console.log("rerender cell")}</StyledCell>
)

export default Cell;