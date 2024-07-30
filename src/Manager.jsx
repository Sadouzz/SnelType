import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import playerImgSrc from './assets/ship.png';
//import bulletImgSrc from './assets/bullet.png';
import Word from './word.js';
import Bullet from './Bullet.jsx';
import sound from './assets/click.wav'
import shotSound from './assets/shot.mp3'
import failSound from './assets/fail.wav'

function Manager({ gameOver }) {

    document.addEventListener('keydown', handleKeyPress);
    const shotSoundVar = new Audio(shotSound);
    const failSoundVar = new Audio(failSound);

    const wordListEasy = ['door', 'pen', 'have', 'your', 'water', 'bench'];
    const wordListMedium = ['bottle', 'account', 'treasure', 'vehicle', 'laptop', 'striker'];
    const wordListHard = ['accumulation', 'development', 'resources', 'headquarters', 'aeroplane', 'airport', 'building'];

    const [currentWords, setCurrentWords] = useState([]);



    //const bulletImage = `<img src=${bulletImgSrc}/>`;
    const [heroImgStyle, setHeroImgStyle] = useState({
        transform: `rotate(${0}deg)`
    });

    const [out, setOut] = useState();
    const [target, setTarget] = useState(null);
    const [wordIndex, setWordIndex] = useState();
    //const [_wordIndex, setMyWordIndex] = useState();
    const [score, setScore] = useState(0);

    const [bullets, setBullets] = useState([]);

    const [failedBool, setFailedBool] = useState("false");
    var failed = false;

    function handleKeyPress(event) {
        const keyPressed = event.key;
        var failDiv = document.getElementById('failedBoolDIV');
        if (failDiv.textContent == "false") {
            KillWords(wordIndex, keyPressed);
        }

        //document.removeEventListener('keydown', handleKeyPress);
    }

    useEffect(() => {
        const intervalId = setInterval(() => {

            var scoreDiv = document.getElementById('scoreSpan');
            if (scoreDiv.textContent < 100) {
                var container = document.getElementById('ws-wrapper');
                const myWord = new Word(wordListEasy[Math.floor(Math.random() * wordListEasy.length)]);
                myWord.displayWord();

                const newWord = document.createElement('div');
                newWord.textContent = myWord.word;

                container.appendChild(newWord);
                //setCurrentWords([...currentWords, newWord]);
                SetPositionWord(newWord, container);
                //clearInterval(intervalID);
                /*const newItems = [...currentWords, newWord];
                setWords(newItems);*/
            }

            if (scoreDiv.textContent < 500 && scoreDiv.textContent > 100) {
                var container = document.getElementById('ws-wrapper');
                const myWord = new Word(wordListMedium[Math.floor(Math.random() * wordListMedium.length)]);
                myWord.displayWord();

                const newWord = document.createElement('div');
                newWord.textContent = myWord.word;

                container.appendChild(newWord);
                SetPositionWord(newWord, container);
                //clearInterval(intervalID);
                /*const newItems = [...currentWords, newWord];
                setWords(newItems);*/
            }

        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    function SetPositionWord(element, container) {
        /*var x = Math.random() * (container.offsetWidth + container.getBoundingClientRect().x - container.getBoundingClientRect().x + 1) + container.getBoundingClientRect().x;*/

        var x = Math.random() * (container.offsetWidth);

        element.style.position = 'absolute';
        element.style.top = `${container.getBoundingClientRect().y}px`;
        element.style.backgroundColor = '#78786d';
        element.style.left = `${x}px`;
        element.style.borderRadius = '10%';
        element.classList.add('animWord');
        element.classList.add('word');
        //alert(element);
        //setCurrentWords([...currentWords, element.textContent]);
        /*setTimeout(function () {
            element.parentNode.removeChild(element);
            failed = true;
            setFailedBool(true);
            var scoreDiv = document.getElementById('scoreSpan');
            gameOver(scoreDiv.textContent);
        }, 20000);*/
    }

    function SetBullet(wordTargeted) {
        var container = document.getElementById('ws-wrapper');
        var hero = document.getElementById('hero');
        const heroRect = hero.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const wordTargetedPos = wordTargeted.getBoundingClientRect();
        const ax = containerRect.x + container.offsetWidth / 2;
        const ay = containerRect.y + container.offsetHeight;
        const ox = container.offsetWidth / 2;
        const oy = heroRect.y;
        const x = wordTargetedPos.x - containerRect.x;
        const y = wordTargetedPos.y - 50;
        const ab = (ox - x) / (oy - y);
        const angle = Math.atan(-ab);

        setBullets([...bullets, { x, y, ox, oy, angle }]);
        RotateHero(angle);
    }

    function RotateHero(angle) {
        setHeroImgStyle({
            transform: `rotate(${angle}rad)`
        });
    }

    const SearchWord = (keyPressed) => {
        console.log("SearchWords");
        var word = document.querySelectorAll('.word');
        let found = false;
        for (var i = 0; i < word.length && found == false; i++) {
            if (keyPressed == word[i].textContent.charAt(0) || keyPressed.toLowerCase() == word[i].textContent.charAt(0)) {
                found = true;
                word[i].style.backgroundColor = 'green';
                return word[i];
                //KillWords(word[i]);
            }
            else {
                failSoundVar.play();
            }
        }
    }

    function KillWords(word, keyPressed) {
        console.log("KillWords");
        if (word == null) {
            word = SearchWord(keyPressed);
            console.log(word);
        }

        if (keyPressed == word.textContent.charAt(0) || keyPressed.toLowerCase() == word.textContent.charAt(0)) {
            shotSoundVar.play();
            SetBullet(word);

            word.textContent = word.textContent.substring(1);
            setOut(word.textContent);
            setTarget(word.textContent);
            setWordIndex(word);
            setScore(score + 1);

            if (word.textContent == "") {
                setTarget();
                setWordIndex(null);
                setScore(score + 10 + 1);
                word.parentNode.removeChild(word);
            }
            document.removeEventListener('keydown', handleKeyPress);

        }
        else {
            failSoundVar.play();
        }
    }

    return (
        <div id='manager'>
            <div id="ws-wrapper">
                {bullets.map((bullet, index) => (
                    <Bullet key={index} x={bullet.x} y={bullet.y} ox={bullet.ox} oy={bullet.oy} angle={bullet.angle} />
                ))}
                <div id="hero"><img id='heroImg' style={heroImgStyle} src={playerImgSrc} /></div>
                <div id='failedBoolDIV' hidden>{failedBool}</div>
                
            </div>
            <div id='test'>
                Target: {target}
            </div>
            <div id='scoreDiv'>
                Score: <span id='scoreSpan'>{score}</span>
            </div>
        </div>

    );
}

export default Manager