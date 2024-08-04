import './App.css';
import './backgroundStars.css'
import React, { useEffect, useRef, useState } from 'react';
import playerImgSrc from './assets/ship.png';
//import bulletImgSrc from './assets/bullet.png';
import Word from './word.js';
import Bullet from './Bullet.jsx';
import sound from './assets/click.wav'
import shotSound from './assets/shot.mp3'
import failSound from './assets/fail.wav'
import LevelAnnouncer from './LevelAnnouncer.jsx';

function Manager({ gameOver }) {

    document.addEventListener('keydown', handleKeyPress);
    const shotSoundVar = new Audio(shotSound);
    const failSoundVar = new Audio(failSound);

    const wordListEasy = ['door', 'pen', 'have', 'your', 'water', 'bench'];
    const wordListMedium = ['bottle', 'account', 'treasure', 'vehicle', 'laptop', 'striker'];
    const wordListHard = ['accumulation', 'development', 'resources', 'headquarters', 'aeroplane', 'airport', 'building'];

    const [level, setLevel] = useState(1);
    //const [wordsCountLevel, setWordsCountLevel] = useState(0);
    //const [currentWordsCountLevel, setCurrentWordsCountLevel] = useState(0);
    const [counter, setCounter] = useState(0);
    const [announce, setAnnounce] = useState(null);
    const announceBool = useRef(true);
    const showLevel = useRef(true);
    const [levelAnnounce, setLevelAnnounce] = useState(true);
    const announceRef = useRef(null);

    const wordsNeeded = useRef(0);
    const wordsCreated = useRef(0);
    var currentWords = 0;
    const currentCount = useRef(0);
    const currentLevel = useRef(0);


    //const bulletImage = `<img src=${bulletImgSrc}/>`;
    const [heroImgStyle, setHeroImgStyle] = useState({
        transform: `rotate(${0}deg)`
    });

    const [out, setOut] = useState();
    const [target, setTarget] = useState(null);
    const [wordIndex, setWordIndex] = useState(null);
    //const [_wordIndex, setMyWordIndex] = useState();
    const score = useRef(0);

    const allWordsCreated = useRef(false);

    const [bullets, setBullets] = useState([]);

    const [failedBool, setFailedBool] = useState("false");
    var failed = false;

    function handleKeyPress(event) {
        const keyPressed = event.key;
        var failDiv = document.getElementById('failedBoolDIV');
        console.log("KeyPressed", keyPressed);
        console.log("WordIndex:", wordIndex);
        if (failDiv.textContent == "false") {
            KillWords(wordIndex, keyPressed);
        }


        //document.removeEventListener('keydown', handleKeyPress);
    }

    /*useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [wordIndex]);*/



    useEffect(() => {
        //level = 1;
        //LevelManager();
        //setWordsCountLevel(5);
        //console.log(wordsCountLevel);
        //wordsNeeded = wordsCountLevel + 1;
        //console.log(wordsNeeded)
        //document.addEventListener('keydown', handleKeyPress);
        const intervalId = setInterval(() => {

            //var scoreDiv = document.getElementById('scoreSpan');
            if (wordsCreated.current < wordsNeeded.current) {

                var container = document.getElementById('ws-wrapper');
                const myWord = new Word(wordListEasy[Math.floor(Math.random() * wordListEasy.length)]);
                myWord.displayWord();

                const newWord = document.createElement('div');
                newWord.textContent = myWord.word;

                container.appendChild(newWord);
                SetPositionWord(newWord, container);
                //AddSubstractWordsCount(+1);
                //setCurrentWordsCount(currentWordsCount => currentWordsCount + 1);
                wordsCreated.current += 1;
                //currentWords = currentWords + 1;
                currentCount.current += 1;
                //setCurrentWordsCountLevel(currentWordsCountLevel  + 1);

                //console.log("Current Words", currentCount.current);
                //console.log(wordsCreated);
            }
            else {
                if (wordsCreated.current == wordsNeeded.current) {
                    allWordsCreated.current = true;
                }
            }

            if (currentCount.current === 0 && wordsCreated.current == wordsNeeded.current && allWordsCreated) {
                
                LevelManager();
                console.log("LevelManager called.");
                //document.removeEventListener('keydown', handleKeyPress);
                //console.log("Coucou");
                //LevelAnnouncement();
            }


            /*var scoreDiv = document.getElementById('scoreSpan');
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
                const newItems = [...currentWords, newWord];
                setWords(newItems);
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
                const newItems = [...currentWords, newWord];
                setWords(newItems);
            }*/

        }, 1000);

        return () => clearInterval(intervalId)/*;document.removeEventListener('keydown', handleKeyPress);*/;
    }, []);

    /*const LevelAnnouncement = () => {
        //setCounter(prevCounter => prevCounter + 1);
        setAnnounce(<LevelAnnouncer _index={currentLevel.current} _score={score.current} />
        );
        setTimeout(function () {
            setAnnounce(undefined);
        }, 1000);
    };*/

    /*function LevelAnnouncement()
    {

    }*/

    function LevelManager() {
        //document.removeEventListener('keydown', handleKeyPress);
        allWordsCreated.current = false;
        //showLevel.current = true;
        currentLevel.current += 1;
        //announceBool.current = true;
        //setLevelAnnounce(true);
        //announceRef.current = <LevelAnnouncer _index={currentLevel.current} _score={score.current} />;
        //setCounter(prevCounter => prevCounter + 1);
        //setAnnounce(<LevelAnnouncer />);
        //document.removeEventListener('keydown', handleKeyPress);
        switch (currentLevel.current) {
            case 1:
                wordsNeeded.current = 4;
                break;
            case 2:
                wordsCreated.current = 0;
                wordsNeeded.current = 6;
                break;
            case 3:
                wordsCreated.current = 0;
                wordsNeeded.current = 10;
                break;
            case 4:
                wordsCreated.current = 0;
                wordsNeeded.current = 14;
                break;
            case 5:
                wordsCreated.current = 0;
                wordsNeeded.current = 15;
                break;
            case 6:
                wordsCreated.current = 0;
                wordsNeeded.current = 18;
                break;
            default:
                console.log("Niveau non géré : ", currentLevel.current);
        }
        //document.removeEventListener('keydown', handleKeyPress);
        /*setTimeout(function () {
            //showLevel.current = false;
            //announceBool.current = false;
            //setLevelAnnounce(false);
            document.removeEventListener('keydown', handleKeyPress);
        }, 1000);*/
    }

    function SetPositionWord(element, container) {
        /*var x = Math.random() * (container.offsetWidth + container.getBoundingClientRect().x - container.getBoundingClientRect().x + 1) + container.getBoundingClientRect().x;*/

        var x = Math.random() * (container.offsetWidth - element.offsetWidth);

        element.style.position = 'absolute';
        element.style.top = `0px`;
        element.style.backgroundColor = '#78786d';
        element.style.left = `${x}px`;
        element.style.borderRadius = '10%';
        element.classList.add('animWord');
        element.classList.add('word');
        //alert(element);
        //setCurrentWords([...currentWords, element.textContent]);
        setTimeout(function () {
            element.parentNode.removeChild(element);
            failed = true;
            setFailedBool(true);
            var scoreDiv = document.getElementById('scoreSpan');
            gameOver(scoreDiv.textContent);
        }, 10000);
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
        //document.removeEventListener('keydown', handleKeyPress);
        for (var i = 0; i < word.length && found == false; i++) {
            if (keyPressed == word[i].textContent.charAt(0) || keyPressed.toLowerCase() == word[i].textContent.charAt(0)) {
                found = true;
                word[i].style.backgroundColor = 'green';
                return word[i];
                //KillWords(word[i]);
            }
            /*else {
                failSoundVar.play();
            }*/
        }
        //document.removeEventListener('keydown', handleKeyPress);
    }

    function KillWords(word, keyPressed) {

        if (word == null) {
            word = SearchWord(keyPressed);
            console.log("Found:", word.textContent);
        }
        else {
            console.log("KillWords Target:", word.textContent);
        }

        if (keyPressed == word.textContent.charAt(0) || keyPressed.toLowerCase() == word.textContent.charAt(0)) {
            shotSoundVar.play();
            SetBullet(word);

            word.textContent = word.textContent.substring(1);
            setOut(word.textContent);
            setTarget(word.textContent);
            setWordIndex(word);
            score.current += 1;

            if (word.textContent == "") {
                setTarget();
                setWordIndex(null);
                score.current += 11;
                word.parentNode.removeChild(word);
                //currentWords = currentWords - 1;
                currentCount.current -= 1;
                //setCurrentWordsCount(currentWordsCount => currentWordsCount - 1);
                //AddSubstractWordsCount(-    1);
                //console.log("Current Words", currentCount.current);
            }
            document.removeEventListener('keydown', handleKeyPress);
        }
        else {
            failSoundVar.play();
            //document.removeEventListener('keydown', handleKeyPress);
        }
        //document.removeEventListener('keydown', handleKeyPress);
    }

    return (
        <div id='manager'>
            <div id="ws-wrapper">
                <div className="stars">
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                </div>
                {bullets.map((bullet, index) => (
                    <Bullet key={index} x={bullet.x} y={bullet.y} ox={bullet.ox} oy={bullet.oy} angle={bullet.angle} />
                ))}
                <div id="hero"><img id='heroImg' style={heroImgStyle} src={playerImgSrc} /></div>
                <div id='failedBoolDIV' hidden>{failedBool}</div>
                {true && (<div className="levelAnnouncer">
                    <h4>LEVEL {currentLevel.current}</h4>
                    <h5>Score {score.current}</h5>
                </div>)}

            </div>
            <div id='test'>
                Target: {target}
            </div>
            <div id='scoreDiv'>
                Score: <span id='scoreSpan'>{score.current}</span>
            </div>
        </div>

    );
}

export default Manager