import './App.css';
import {React, useState} from 'react';
import Hangman from './Hangman';

const  App = () => {

  //ALL HOOKS USEED IN APP
  //------------------------------------------START OF HOOKS-------------------------------------

  //Hook responsible for letters that are still avaliable
  const [avaliableLetters, setAvaliableLetters] = useState(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','r','s','t','u','v','w','x','y','z']); 
 
  //Used letters that does not contain in missing word
  const [wastedLetters, setWastedLetters] = useState([]);
 
  //constant that stores word, which player has to guess
  const [word,setWord] = useState("");
 
  const[correctLetters, setCorrectLetters] = useState([]);
  //Number of failed tries
  const [failed, updateFailedTries] = useState(0);
  
  //------------------------------------------END OF HOOKS--------------------------------------
  
  //Default value of Keyboard
  const defaultLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','r','s','t','u','v','w','x','y','z'];
  
  //URL of API. "Number" in url stands for number of words thats will be fetched from API. 
  const request = new Request(`https://random-word-api.herokuapp.com/word?number=1`);

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

  const newGame = () =>{
        getNewWord();
        updateKeyboard(defaultLetters);
        setWastedLetters([]);
        updateFailedTries(0);
        setCorrectLetters([]);
  }
 
  return(
    <>
      <GameEnding failed={failed} words={{missing: word,guessed: correctLetters}}></GameEnding>
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
      onClick={ ()=>{newGame()}
      }>Roll new Word</button>
      </div>
    </>
  )
}

const GameEnding = (props) =>{
 const lettersCount = getUniqueCount(props.words.missing)
  return(
    <>
    {lettersCount === props.words.guessed.length ? <GameEndingPrompt win={true} word={props.words.missing}/> : null }
    {10 === props.failed ? <GameEndingPrompt win={false} word={props.words.missing}/>: null}
    </>
  )
}

const GameEndingPrompt = (props)=>{
  const winnerMsg = `Your missing word was: ${props.word}`;
  const loserMsg = `Your missing word was: ${props.word}`;
 return(
    <div className={`gameEnding`} value={props.win}>
      {props.win ? "Congrats! You win."  : "You lose :+(. " }
      <br></br>
      {props.win ?  winnerMsg :  loserMsg}
    </div>
 )
}
function getUniqueCount(word){
word = word.split('');
let uniqueLetters =[];
 word.forEach(element => {
  uniqueLetters.includes(element) ?  console.log('') : uniqueLetters.push(element) 
 }); 
return(
  uniqueLetters.length
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
