import React, { useState } from 'react';

import { createStage } from '../gameHelpers';

//Styled components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

//Custom hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

//Components

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
    // SPEED MODIFIER DEPENDING ON LEVEL THE PLAYER IS ON
    const [dropTime, setDropTime] = useState(null);
    // TELLS US IF THE GAME WHETHER THE GAME IS OVER OR NOT (TRUE/FALSE)
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player);

    console.log('re-render');

    const movePlayer = dir => {
        updatePlayerPos({ x: dir, y: 0 });
    }

    const startGame = () => {
        // RESETS EVERYTHING
        setStage(createStage());
        resetPlayer();
    }
    
    const drop = () => {
        updatePlayerPos({ x: 0, y: 1, collided: false })

    }
    
    const dropPlayer = () => {
        drop();

    } 

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37){
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            }
        }

    }





    return (
        // STYLEDTETRISWRAPPER IS RESPONSIBLE FOR THE REGISTERING THE KEYSTROKES OF THE USER
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <StyledTetris>
            <Stage stage={stage} />
            <aside>
                {gameOver ? (
                    <Display gameOver={gameOver} text="Game Over" /> // DISPLAYS TO THE USER THAT THE GAME IS OVER IF GAMEOVER IS TRUE
                ) : (
                <div>
                <Display text="Score"/>
                <Display text="Rows"/>
                <Display text="Level"/>
                </div>
                )}
                <StartButton onCick={startGame} />
            </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
};

export default Tetris;