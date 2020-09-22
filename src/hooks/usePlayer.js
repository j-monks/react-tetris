import { useState, useCallback} from 'react';

import { TETROMINOS,randomTetromino } from '../tetrominos';
import { STAGE_WIDTH, checkCollision } from "../gameHelpers"

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

    // recieves a tetromino and a direction
    // just handles the rotation of the tetromino
    const rotate = (tetromino, dir) => {
        // Makes all the rows in the array to become cols (tetromino array)
        const rotatedTetro = tetromino.map((_, index) => 
        tetromino.map(col => col[index]),
        );
        // Reverse each row to gt a rotated tetromino
        // if we are moving with value > 0 then we know we are rotating clockwise
        // if its < 1 it gets the tetromino rows get reversed
        if (dir > 0) return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
    }
    
    
    const playerRotate = (stage, dir) => {
        const copiedPlayer = JSON.parse(JSON.stringify(player));
        copiedPlayer.tetromino = rotate(copiedPlayer.tetromino, dir);

        const pos = copiedPlayer.pos.x; 
        let offset = 1;
        while(checkCollision(copiedPlayer, stage, { x: 0, y: 0 })) {
            copiedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > copiedPlayer.tetromino[0].length) {
                rotate(copiedPlayer.tetromino, -dir);
                copiedPlayer.pos.x = pos;
                return;
            }
        }
        setPlayer(copiedPlayer);
    }


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

    

    return [player, updatePlayerPos, resetPlayer, playerRotate];
        
};

 

// Seperated out the logic into custom hooks (player logic) 