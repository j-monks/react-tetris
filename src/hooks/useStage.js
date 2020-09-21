import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';
// UseEffect allows us to avoid messy and convoluted lifecycle functions by 
// letting us keep the relevant in one place instead of spreading it across
// componentDidMount, componentDidUpdate and componentWillUnmount < can all be handled by the useEffect hook

export const useStage = (player, resetPlayer) => {
    // CREATING THE INITIAL STAGE (CLEAN BOARD)
    const [stage, setStage] = useState(createStage());

    useEffect(() => {
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
                })
            });
            return newStage;

        };
        setStage(prev => updateStage(prev));

    }, [player]);

    return [stage, setStage];
}