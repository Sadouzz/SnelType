import Manager from "./Manager";
import React, { useEffect, useState } from 'react';

function Menu() {

    const [playBool, setPlayBool] = useState(false);
    const [gameOverBool, setgameOverBool] = useState(false);
    const [scoreOb, setScoreOb] = useState(0);

    var play = false;

    function handleClickOnPlay() {
        setPlayBool(true);
        setgameOverBool(false);
        play = true;
    }

    function Retry() {
        setPlayBool(false);
        setgameOverBool(false);
        play = true;
    }

    const gameOver = (score) => {
        setScoreOb(score)
        setgameOverBool(true);
    };


    return (
        <div id="globalManager">
            {!playBool && (<div id="menuUI">
                <h1>SNEL TYPE</h1>
                <div id='uiControls'>
                    <button onClick={handleClickOnPlay}>Jouer</button>
                    <button onClick={handleClickOnPlay}>Paramètres</button>
                    <p>By Ousman SADJO</p>
                </div>

            </div>)}

            {gameOverBool && (<div id="gameOverUI">
                <h1>GAME OVER</h1>
                <p>{scoreOb}</p>
                <div id='uiControls'>
                    <button onClick={Retry}>Réessayer</button>
                    <button onClick={handleClickOnPlay}>Ménu Principal</button>
                </div>

            </div>)}

            {playBool && (<Manager gameOver={gameOver} />)}
            
        </div>
    );
}

export default Menu
