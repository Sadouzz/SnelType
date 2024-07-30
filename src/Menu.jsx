import Manager from "./Manager";
import React, { useEffect, useState } from 'react';

function Menu() {

    const [playBool, setPlayBool] = useState(false);
    const [gameOverBool, setgameOverBool] = useState(false);
    const [scoreOb, setScoreOb] = useState(0);

    var play = false;

    const [components, setComponents] = useState();
    const [counter, setCounter] = useState(0);

    const addNewComponent = () => {
        setCounter(prevCounter => prevCounter + 1);
        setComponents(<Manager gameOver={gameOver} key={counter} />);
    };

    function handleClickOnPlay() {
        addNewComponent();
        setPlayBool(true);
        setgameOverBool(false);
        play = true;
    }

    function Retry() {
        addNewComponent();
        setPlayBool(true);
        setgameOverBool(false);
        removeWords();
        /*setPlayBool(false);
        setgameOverBool(false);
        setTimeout(function () {
            setPlayBool(true);
        }, 1000);
        play = true;*/
    }

    function Menu() {

    }

    const gameOver = (score) => {
        setScoreOb(score)
        setgameOverBool(true);
    };

    function removeWords() {
        var words = document.querySelectorAll(".word");
        words.forEach(function (element) {
            element.parentNode.removeChild(element);
        });
    }


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

            {playBool && components}
            <div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
            </div>
        </div>
    );
}

export default Menu
