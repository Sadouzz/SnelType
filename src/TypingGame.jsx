import React, { useEffect } from 'react';

function TypingGame() {
    // Fonction de gestion des touches pressées
    const handleKeyPress = (event) => {
        console.log('Key pressed:', event.key);
        // Ajoutez votre logique de jeu ici
    };

    // Fonction pour ajouter l'event listener
    const addKeyPressListener = () => {
        document.addEventListener('keydown', handleKeyPress);
        console.log('Keydown event listener added');
    };

    // Fonction pour retirer l'event listener
    const removeKeyPressListener = () => {
        document.removeEventListener('keydown', handleKeyPress);
        console.log('Keydown event listener removed');
    };

    // Utilisez useEffect pour gérer le cycle de vie des listeners
    useEffect(() => {
        // Ajouter le listener au montage
        addKeyPressListener();

        // Retirer le listener au démontage
        return () => {
            removeKeyPressListener();
        };
    }, []); // Le tableau vide signifie que l'effet ne s'exécute qu'une seule fois, au montage

    // Appel des fonctions add et remove dans le jeu selon les besoins
    const startGame = () => {
        addKeyPressListener();
    };

    const stopGame = () => {
        removeKeyPressListener();
    };

    return (
        <div>
            <h1>Typing Game</h1>
            <button onClick={startGame}>Start Game</button>
            <button onClick={stopGame}>Stop Game</button>
            <p>Appuyez sur une touche et vérifiez la console</p>
        </div>
    );
}

export default TypingGame;
