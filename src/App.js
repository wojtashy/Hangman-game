import './App.css';
import {React, useState} from 'react';

import Hangman from './Hangman';
const  App = () => {

  //ALL HOOKS USEED IN APP
  //------------------------------------------START OF HOOKS-------------------------------------

  //Hook responsible for letters that are still avaliable
  const [avaliableLetters, setAvaliableLetters] = useState(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','r','s','t','u','w','x','y','z']); 
 
  //Used letters that does not contain in missing word
  const [wastedLetters, setWastedLetters] = useState([]);
 
  //constant that stores word, which player has to guess
  const [word,setWord] = useState("");
 
  const[correctLetters, setCorrectLetters] = useState([]);
  //Number of failed tries
  const [failed, updateFailedTries] = useState(0);

  //Toggles wheter to allow swearwords in game or not
  const[swear, setSwear] = useState(1);

  //------------------------------------------END OF HOOKS--------------------------------------
  
  //Default value of Keyboard
  const defaultLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','r','s','t','u','w','x','y','z'];
  
  //URL of API. "Number" in url stands for number of words thats will be fetched from API. "swear" has value of 1 or 0 depending on user settings(hook - swear)
  const request = new Request(`https://random-word-api.herokuapp.com/word?number=1&swear=${swear}`);

  //Function responsible for updating keyboard according to game state. At the begining it returns 24 letters.
  const updateKeyboard = (newKeyboard) =>{
    setAvaliableLetters(newKeyboard);
  }
  
  const missedLettersUpdate = (missed) =>{
    setWastedLetters(missed);
  }

  //Function that fetches new word from API 
  const getNewWord = () =>{
    fetch(request).then(result => result.json()).then(data => setWord(data[0]));
  };

  //Getting new word at the begining
  window.onload = () => {getNewWord()};


  return(
    <>
      <div className="swear">
          Swearwords
         <button swear={swear} onClick={()=>{
      swear === 1 ? setSwear(0) : setSwear(1)
    }
    }></button>
    </div>
    
    

     <div className="app">
      <HiddenWord content={word} guessed={correctLetters}></HiddenWord>
      <Hangman count={failed}></Hangman>
      <div className='keyboard'>
            {avaliableLetters.map((e,i)=> {
              return(
            <button key={i}
            onClick={()=>{
             if( !word.includes(e)){
               
               const missed = wastedLetters;
               missed[missed.length] = e;
               updateFailedTries(failed+1);
              missedLettersUpdate(missed);
             }
             else{
               const correct = correctLetters;
               correct[correct.length] = e;
               setCorrectLetters(correct);
             }
             const newLetters = avaliableLetters.filter(l => l !== e);
               updateKeyboard(newLetters);
            }
          
          }
            >
              {e}
            </button>
              )
            })}
        </div>
        <div className="missedLetters">
          {
            <MissedLetters missed={wastedLetters}></MissedLetters>
          }
        </div>
      <button 
      className="newWord"
      onClick={ ()=>{
        getNewWord();
        updateKeyboard(defaultLetters);
        setWastedLetters([]);
      }
      }>Roll new Word</button>
      </div>
    </>
  )
}


function MissedLetters(props){
  return(
    <div>
      {props.missed.map((e,k) => <p key={k}>{e}</p>)} 
      
    </div>
  )
}

function HiddenWord(props){
  
  return(
    <div className="hidden">
      {props.content.split('').map((e,i) =>   <p key={i.toString()}>{ props.guessed.includes(e) ? e : null}</p>)
    }
   
    </div>
  )

}


export default App;
