import React, { useState } from 'react';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import { createStage, checkCollision } from '../gameHelpers';

//Custom hooks
import { useGameStatus } from '../hooks/useGameStatus';
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

//Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';



//Music
import Player from "./Player";



const Tetris = () => {
    // SPEED MODIFIER DEPENDING ON LEVEL THE PLAYER IS ON
    const [dropTime, setDropTime] = useState(null);
    // TELLS US IF THE GAME WHETHER THE GAME IS OVER OR NOT (TRUE/FALSE)
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    console.log('re-render');

    // responsible for moving the player left & right
    const movePlayer = dir => {
        // sending in the player, stage and intended position we want to move to
        // so if we aren't colliding with anything we continue with the intended move
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    };

    const startGame = () => {
        // RESETS EVERYTHING
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    }
    
    const drop = () => {

        // Increase level when player has cleared 10 rows
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            // Also increase speed
            setDropTime(1000 / (level + 1) + 200); 
        }

        if(!checkCollision(player, stage, { x: 0, y: 1 })){
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            // Game Over
            // if the players y axis is less than one we know we are 
            // colliding near the top of the board meaning game over
            if (player.pos.y < 1){
                console.log("GAME OVER!");
                setGameOver(true);
                // drop time is deactivated once the game is over
                setDropTime(null);
            }
        updatePlayerPos({ x: 0, y: 0, collided: true })
    }
}

    const keyUp = ({ keyCode }) => {
    if(!gameOver) {
        if (keyCode === 40) {
            setDropTime(1000 / (level + 1) + 200);
        }
    }
    }

    
    const dropPlayer = () => {
        setDropTime(null);
        drop();

    }; 

    const move = ({ keyCode }) => {
        if (!gameOver) {
          if (keyCode === 37) {
            movePlayer(-1);
          } else if (keyCode === 39) {
            movePlayer(1);
          } else if (keyCode === 40) {
            dropPlayer();
        } else if (keyCode === 38){
            playerRotate(stage, 1)
        }
    }
}

useInterval(() => {
    drop();
}, dropTime)

    return (
        // STYLEDTETRISWRAPPER IS RESPONSIBLE FOR THE REGISTERING THE KEYSTROKES OF THE USER
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
            <Player />
            <StyledTetris>
            <Stage stage={stage} />
            <aside>
                {gameOver ? (
                    <Display gameOver={gameOver} text="Game Over" /> // DISPLAYS TO THE USER THAT THE GAME IS OVER IF GAMEOVER IS TRUE
                ) : (
                <div>
                    <Display text={`Score: ${score}`}/>
                    <Display text={`Rows: ${rows}`}/>
                    <Display text={`Level: ${level}`}/>
                </div>
                )}
                <StartButton callback={startGame} />
            </aside>    
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;