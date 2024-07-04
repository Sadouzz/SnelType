import './App.css';
import React, { useEffect, useState } from 'react';
import playerImgSrc from './assets/ship.png';
//import bulletImgSrc from './assets/bullet.png';
import Word from './word.js';
import Bullet from './Bullet.jsx';
import sound from './assets/click.wav'
import shotSound from './assets/shot.mp3'
import failSound from './assets/fail.wav'

function Manager() {

    document.addEventListener('keydown', handleKeyPress);
    const shotSoundVar = new Audio(shotSound);
    const failSoundVar = new Audio(failSound);

    const wordListEasy = ['door', 'pen', 'have', 'your', 'water', 'bench'];
    const wordListMedium = ['bottle', 'account', 'treasure', 'vehicle', 'laptop', 'striker'];
    const wordListHard = ['accumulation', 'development', 'resources', 'headquarters', 'aeroplane', 'airport', 'building'];



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
    const [playBool, setPlayBool] = useState(false);

    const handleClickOnPlay = () => {
        setPlayBool(!playBool);
    }

    function handleKeyPress(event) {
        const keyPressed = event.key;
        KillWords(wordIndex, keyPressed);
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

    /*const intervalID = setInterval( () => {
        var container = document.getElementById('wordsContainer');
        const myWord = new Word(wordList[Math.floor(Math.random() * wordList.length)]);
        myWord.displayWord();

        const newWord = document.createElement('div');
        newWord.textContent = myWord.word;

        container.appendChild(newWord);
        SetPositionWord(newWord, container);
        //clearInterval(intervalID);
        /*const newItems = [...currentWords, newWord];
        setWords(newItems);
    }, 4000)
    */


    function SetPositionWord(element, container) {
        var x = Math.random() * (container.offsetWidth + container.getBoundingClientRect().x - container.getBoundingClientRect().x + 1) + container.getBoundingClientRect().x;
        //var y = Math.random() * window.innerHeight;
        element.style.position = 'absolute';
        element.style.top = `${container.getBoundingClientRect().y}px`;
        //alert(container.getBoundingClientRect().y);
        element.style.backgroundColor = '#78786d';
        element.style.left = `${x}px`;
        element.style.borderRadius = '10%';
        element.classList.add('animWord');
        element.classList.add('word');/*
        setTimeout(function () {
            element.parentNode.removeChild(element);
            var container = document.getElementById('scoreDiv');
            alert(`Game Over. Score: ${container.textContent}`);
        }, 20000);*/
    }

    /*
    function SetBullet(wordTargeted) {
        var container = document.getElementById('wordsContainer');
        const containerRect = container.getBoundingClientRect();
        const x = containerRect.x + container.offsetWidth/2;
        const y = '85vh';
        const wordTargetedPos = wordTargeted.getBoundingClientRect();
        const angle = Math.atan((wordTargetedPos.x-x)/(20-containerRect.y ));


        setBullets([...bullets, { x, y, angle }]);

    }*/
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
        const ab = (ox-x)/(oy-y);
        const angle = Math.atan(-ab);



        setBullets([...bullets, { x, y, ox, oy, angle }]);
        RotateHero(angle);
    }

    function RotateHero(angle){
        setHeroImgStyle({
            transform: `rotate(${angle}rad)`
        });
    }


    /*setTimeout(function() {
        var word = document.querySelectorAll('.word');
        for(var i = 0; i < word.length; i++) {
            var x = Math.random() * window.innerWidth;
            word[i].style.position = 'absolute';
            word[i].style.top = '0';
            word[i].style.backgroundColor = 'red';
            word[i].style.left = `${x}px`;
            word[i].classList.add('animWord');
        }
        var x = Math.random() * window.innerWidth;
        //var y = Math.random() * window.innerHeight;
        
        //WordProgressOnScreen(element);
        //console.log(x);
    }, 1);*/



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
            //document.querySelector('.word').textContent = word.textContent;
            setTarget(word.textContent);
            setWordIndex(word);
            setScore(score + 1);

            if (word.textContent == "") {
                setTarget();
                setWordIndex(null);
                setScore(score + 10);
                word.parentNode.removeChild(word);
            }
            document.removeEventListener('keydown', handleKeyPress);

            /*setTimeout(function () {

                word.textContent = word.textContent.substring(1);
                setOut(word.textContent);
                //document.querySelector('.word').textContent = word.textContent;
                setTarget(word.textContent);
                setWordIndex(word);
                setScore(score + 1);

                if (word.textContent == "") {
                    setTarget();
                    setWordIndex(null);
                    setScore(score + 10);
                    word.parentNode.removeChild(word);
                }
                document.removeEventListener('keydown', handleKeyPress);

            }, 300);
            document.removeEventListener('keydown', handleKeyPress);*/

        }
        else {
            failSoundVar.play();
        }
        //document.removeEventListener('keydown', handleKeyPress);
    }

    /*
     <div hidden>
                {bullets.map((bullet, index) => (
                <Bullet key={index} x={bullet.x} y={bullet.y} angle={bullet.angle} />
                    ))}
     </div>

     <div className="hero">
                    <img src={playerImgSrc} />
        </div>
    */


    return (
        <div id='manager'>
            {!playBool && (<div id="menuUI">
                <h1>SNEL TYPE</h1>
                <div id='uiControls'>
                    <button onClick={handleClickOnPlay}>Jouer</button>
                    <button onClick={handleClickOnPlay}>Paramètres</button>
                    <p>By Ousman SADJO</p>
                </div>
            </div>)}
            {playBool && (<div id="ws-wrapper">
                {bullets.map((bullet, index) => (
                    <Bullet key={index} x={bullet.x} y={bullet.y} ox={bullet.ox} oy={bullet.oy} angle={bullet.angle} />
                ))}
                <div id="hero"><img id='heroImg' style={heroImgStyle} src={playerImgSrc} /></div>


            </div>)}
            {playBool && (<div id='test'>
                Target: {target}
            </div>)}
            {playBool && (<div id='scoreDiv'>
                Score: <span id='scoreSpan'>{score}</span>
            </div>)}
        </div>
    );
}

export default Manager