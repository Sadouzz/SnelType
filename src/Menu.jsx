import Manager from "./Manager";
import React, { useEffect, useState } from 'react';

function Menu() {

    const [playBool, setPlayBool] = useState(false);

    var play = false;

    function handleClickOnPlay() {
        setPlayBool(true);
        play = true;
    }

    return (
        <div>
            <div id="menuUI">
                <h1>SNEL TYPE</h1>
                <div id='uiControls'>
                    <button onClick={handleClickOnPlay}>Jouer</button>
                    <button onClick={handleClickOnPlay}>Paramètres</button>
                    <p>By Ousman SADJO</p>
                </div>
                {playBool && (<Manager></Manager>)}
            </div>
        </div>
    );
}

export default Menu
