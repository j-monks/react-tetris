import { useState } from 'react';

import { randomTetromino } from '../tetrominos';

//Custom hook must be called use
export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: {x: 0, y: 0},
        tetromino: randomTetromino().shape,
        collided: false,
    });

    //Above is a simplified version of this
    //const playerState = useState();
    //const player = playerState[0]
    //const setPlayer = playerState[1]

    return [player];

}


// Seperated out the logic into custom hooks (player logic) 