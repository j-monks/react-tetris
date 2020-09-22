export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

// CREATES A MULTI-DIMENSIONAL ARRAY THAT REPRESENTS 
// ROWS AND COLUMNS ON THE GAMEBOARD
// FOR EACH ROW WE CREATE A NEW ARRAY FROM THE STAGE WIDTH AND 
// WE FILL IT WITH ANOTHER ARRAY
export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear'])
  );

// collision detection logic
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  // looping through the tetromino that we have in play & checking if any of the cells inside that 
  // tetromino collide with any of the cells in the stage field
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // 1. Check that we're on an actual Tetromino cell
      if (player.tetromino[y][x] !== 0) {
        if (
          // 2. Check that our move is inside the game areas height (y)
          // That we're not go through bottom of the play area
          !stage[y + player.pos.y + moveY] ||
          // 3. Check that our move is inside the game areas width (x)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 4. Check that the cell wer'e moving to isn't set to clear
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            'clear'
        ) {
          return true;
        }
      }
    }
  }
  // 5. If everything above is false
  return false;
};



