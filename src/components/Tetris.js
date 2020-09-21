import React, { useState } from 'react';

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

    const [player] = usePlayer();
    const [stage, setStage] = useStage(player);

    console.log('re-render');
    return (
        <StyledTetrisWrapper>
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
                <StartButton />
            </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
};

export default Tetris;