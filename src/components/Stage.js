import React from 'react';
import { StyledStage } from './styles/StyledStage'

import Cell from './Cell';




const Stage = ({ stage }) => (
  <StyledStage width={stage[0].length} height={stage.length}>
     {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} /> ))}
  </StyledStage>

);

// SO WE ARE PASSING IN THE STAGE THE ONE WE CREATED USING THE CREATESTAGE FUNCTION
// WE THEN MAP THROUGH THE STAGE ARRAY AND WE GET THE ROW, EACH ROW IS ALSO AN ARRAY
// WE ARE GOING THROUGH THAT ARRAY ALSO AND WE GET THE CELL 

// WITH THE MAP WE ARE GRABBING THAT CELL , THATS EQUAL TO '0', CLEAR AND SETTING 
// THE ENTIRE STAGE IS GOING TO BE EQUAL TO THE CELL THAT WAS MADE IN GAME HELPERS
// ESSENTIALLY A BLANK SLATE STAGE

// TAKING BLUEPRINT OF STAGE DIMENSIONS FROM CREATESTAGE AND THEN BUILDING THAT HERE RENDERING A CELL COMPONENT

export default Stage;