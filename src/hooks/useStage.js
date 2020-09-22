import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';
// UseEffect allows us to avoid messy and convoluted lifecycle functions by 
// letting us keep the relevant in one place instead of spreading it across
// componentDidMount, componentDidUpdate and componentWillUnmount < can all be handled by the useEffect hook

export const useStage = (player, resetPlayer) => {
    // CREATING THE INITIAL STAGE (CLEAN BOARD)
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);

        //create a new array with reduce function called Ack
        //Check the row for any cell with a value of 0, if it does contain a 0 it should
        //not be cleared
        const sweepRows = newStage => 
         newStage.reduce((ack, row) => {
             if (row.findIndex(cell => cell[0] === 0) === -1) {
                 setRowsCleared(prev => prev + 1);
                 ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                 return ack;
                }
              ack.push(row);
              return ack;
            }, [])
         


        const updateStage = prevStage => {
            //FIRST CLEAR THE STAGE (FLUSHING THE STAGE REMOVING ANYTHING THAT SHOULDN'T BE THERE)
            const newStage = prevStage.map(row =>
                // CHECKS EACH CELL IF ITS SET TO CLEAR, IF ITS CLEAR IT RETURNS A CLEAR CELL AND IF NOT RETURNS THE PREVIOUS CELL
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
            );

            //THEN DRAW THE TETROMINO
            //LOOP THROUGH TETROMINO TO DETERMINE DIMENSIONS
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ];
                    }
                });
            });
            // checking if we collided
            if (player.collided) {
                resetPlayer();
                return sweepRows(newStage);
            }

            return newStage;

        };
        setStage(prev => updateStage(prev));

    }, [
        player.collided,
        player.pos.x,
        player.pos.y,
        player.tetromino,
        resetPlayer,
      ]);

    return [stage, setStage];
};