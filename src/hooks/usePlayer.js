import { useState, useCallback} from 'react';

import { TETROMINOS,randomTetromino } from '../tetrominos';
import { STAGE_WIDTH } from "../gameHelpers"

//Custom hook must be called use
export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: {x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    //Above is a simplified version of this
    //const playerState = useState();
    //const player = playerState[0]
    //const setPlayer = playerState[1]

    const updatePlayerPos = ({ x, y, collided }) => {
        // getting previous state, your state will by default your previous position plus or minus 1
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)},
            collided,
        }));
    }
        // starting position of the tetrominos (player)
        const resetPlayer = useCallback(() => {
            setPlayer({
                pos: { x: STAGE_WIDTH / 2 -2, y: 0 },
                tetromino: randomTetromino().shape,
                collided: false

            });
        }, []);

    

    return [player, updatePlayerPos, resetPlayer];

};

 

// Seperated out the logic into custom hooks (player logic) 