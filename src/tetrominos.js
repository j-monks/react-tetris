 export const TETROMINOS = {
     // CLEAN CELL, WHAT WE DISPLAY WE WHEN AREN'T SHOWING ANY TETROMINOS 
     0: { shape: [[0]], color: '0, 0, 0' },
     
     I: {
         shape: [
             [0, 'I', 0, 0],
             [0, 'I', 0, 0],
             [0, 'I', 0, 0],
             [0, 'I', 0, 0],
         ],
         color: '80, 227, 230',
     },
     J: {
        shape: [
            [0, 'J', 0],
            [0, 'J', 0],
            ['J', 'J', 0,],
            
        ],
        color: '36, 95, 223',
    },
    L: {
        shape: [
            [0, 'L', 0],
            [0, 'L', 0],
            [0, 'L', 'L'],
            
        ],
        color: '36, 95, 223',
    },
    O: {
        shape: [
            ['O', 'O',],
            ['O', 'O',],
            
            
        ],
        color: '223, 173, 36',
    },
    S: {
        shape: [
            [0, 'J', 0],
            [0, 'J', 0],
            ['J', 'J', 0,],
            
        ],
        color: '36, 95, 223',
    },
    S: {
        shape: [
            [0, 'S', 'S'],
            ['S', 'S', 0],
            [0, 0, 0,],
            
        ],
        color: '48, 211, 56',
    },
    T: {
        shape: [
            [0, 0, 0],
            ['T', 'T', 'T'],
            [0, 'T', 0,],
            
        ],
        color: '132, 61, 198',
    },
    z: {
        shape: [
            ['Z', 'Z', 0],
            [0, 'Z', 'Z'],
            [0, 0, 0,],
            
        ],
        color: '227, 78, 78',
    },




     
 }

 // FUNCTION THAT GENERATES A RANDOM TETROMINO
export const randomTetromino = () => {
    // STRING HOLDING ALL OUR PRE-DEFINED TETROMINOS SO WE CAN CHOOSE FROM THEM
    const tetrominos = "IJLOSTZ";
    const randTetromino = 
        // SO WE ARE GRABBING A RANDOM NUMBER FROM THE MATH.FLOOR AND USING IT AS AN INDEX 
        // FOR THE TETROMINOS STRING
        tetrominos[Math.floor(Math.random() * tetrominos.length)];
        // USING THE LETTER WE GET BACK TO THEN FURTHER USE THAT AS ANOTHER INDEX FOR TETROMINOS
        // TO GET BACK AND RETURN A BLUEPRINT OF THE SHAPE
        return TETROMINOS[randTetromino];
}

 // WHEN MAKING THE TETROMINOS THE ACTUAL SHAPE OF SPACE ON THE SCREEN IS 
 // REPRESENTED BY A '1' AND EMPTY SPACE IS REPRESENTED BY A '0'
 // THE COLOURS ARE IN RGBA FORMAT

 