export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

// CREATES A MULTI-DIMENSIONAL ARRAY THAT REPRESENTS 
// ROWS AND COLUMNS ON THE GAMEBOARD
// FOR EACH ROW WE CREATE A NEW ARRAY FROM THE STAGE WIDTH AND 
// WE FILL IT WITH ANOTHER ARRAY
export const createStage = () =>
 console.log(Array.from(Array(STAGE_HEIGHT), () =>
 new Array(STAGE_WIDTH).fill([0, 'clear'])  
 ));


