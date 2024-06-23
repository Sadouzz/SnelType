import './App.css';
import Word from './word.js';
//import { useState } from 'react';
import React, { useState } from 'react';


function App() {

  const maxWordCount = 5;
  document.addEventListener('keydown', handleKeyPress);

  const wordList = ['door', 'pen', 'be', 'your', 'water', 'bottle'];

  //var currentWords = [];
  var [currentWords, setWords] = useState([]);
  let score = 0;
  let scoreElement = document.getElementById("score");
  var container = document.getElementById('wordsContainer');
  //const targetWord = null;
  var [targetWord, setMyTargetWord] = useState(null);
  const [_wordIndex, setMyWordIndex] = useState();

  setTimeout(function(){
    var container = document.getElementById('wordsContainer');

    for(let i = 0; i < 1; i++)
      {
        const myWord = new Word(wordList[Math.floor(Math.random() * wordList.length)]);
        myWord.displayWord(); 
    
        const newWord = document.createElement('div');
        newWord.textContent = myWord.word;

        container.appendChild(newWord);
        SetPositionWord(newWord);

        const newItems = [...currentWords, newWord];
        setWords(newItems);
      }
  }, 5000)

  

  function SetPositionWord(element){
    var x = Math.random() * window.innerWidth;
    //var y = Math.random() * window.innerHeight;
    element.style.position = 'absolute';
    element.style.top = '0';
    element.style.backgroundColor = 'red';
    element.style.left = `${x}px`;
    WordProgressOnScreen(element);
    //console.log(x);
  }

  function WordProgressOnScreen(element)
  {

   
  }

  
  //var targetWord;
  //var _wordIndex;
  // Function to be called when a key is pressed
  function handleKeyPress(event) 
  {
    // Access the key that was pressed
    const keyPressed = event.key;

    // Log the pressed key to the console (optional)
    console.log(`Key pressed: ${keyPressed}`);
    console.log(`Target ${targetWord}`);
  if(targetWord == undefined/* || targetWord == ""*/)
  {
    SearchWords(keyPressed);
  }
  else{
    KillWords(keyPressed, _wordIndex);
  }


    // Add your custom logic based on the key pressed
    // For example:
    if (keyPressed === 'Enter') 
      {
      // Execute specific code when Enter key is pressed
      alert('Enter key was pressed!');
      }
  }
  
  function SearchWords(key)
  {
    var stop;
    for(let i = 0; i < currentWords.length && !stop; i++)
      {
        console.log("SearchWords");
        const myString = currentWords[i].textContent;
        const firstChar = myString.charAt(0);

        if(firstChar == key)
          {
            stop = true;
            targetWord =currentWords[i].textContent;
            //setMyTargetWord(currentWords[i].textContent);
            //targetWord = currentWords[i].textContent;
            setMyWordIndex(i);
            console.log(`Target: ${targetWord}`);
            KillWords(key, i);
          }
      }
  }

  function KillWords(key, _index){
    console.log("KillWords");
    const myString = currentWords[_index].textContent;
    const firstChar = myString.charAt(0);

    if(firstChar == key)
      {
        
        currentWords[_index].textContent = currentWords[_index].textContent.substring(1);
        //currentWords[_index] = currentWords[_index].textContent.substring(1);
        //_wordIndex = i;
        setMyTargetWord(currentWords[_index].textContent);
        //targetWord = currentWords[_index].textContent;
        console.log(`TargetAfterShot: ${targetWord}`);
        //console.log(`Remaining : ${currentWords[_index]}`);
        //console.log(`Actual array: ${currentWords}`);

        if(currentWords[_index].textContent == ""){
          setMyTargetWord();
          alert(targetWord);
        }
        //console.log(targetWord);
      }

  }

  /*let activeWordIndex = null;

  for(let i = 0; i < maxWordCount; i++)
    {
      const word = new Word(randomWord());

      word.onDie = onWordDies;
      word.onHit = onWordHits;

      words[i] = word;

      setTimeout(function(){
        word.attack();
      }, 1000 * i);
    }
  
  function randomWord()
  {
    return wordList[ helper.random(0, wordList.length) ];
  }

  function onWordDies(word){
    activeWordIndex = null;
    word.reset(randomWord());
  }

  function onWordHits(word){
    for(let i = 0; i < words.length; i++){
      word[i].stop();
    }

    setTimeout(function(){
      alert(`Game Over ${score}`);
    }, 10);
  }*/


  return (
    <>
      <div id="ws-wrapper">
        <div className="hero"></div>
        <div id='score'></div>
        <div id='wordsContainer'>
          
        </div>
      </div>
      <div id='test'>
        Target: {targetWord}
      </div>
    </>
  );
}

export default App
