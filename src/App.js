import './App.css';
import {React, useState} from 'react';
import Keyboard from './Keyboard'; 
import Hangman from './Hangman';
function App(){

  const [avaliableLetters, setAvaliableLetters] = useState(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','r','s','t','u','w','x','y','z']);
  const [word,setWord] = useState("test");
  const [tries, updateTries] = useState(0);
  const defaultLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','r','s','t','u','w','x','y','z'];
  const[swear, setSwear] = useState(1);
  const request = new Request(`https://random-word-api.herokuapp.com/word?number=1&swear=${swear}`);

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
      <HiddenWord content={word}></HiddenWord>
      <Hangman failed={0}></Hangman>
      <Keyboard content={avaliableLetters}></Keyboard>
      <button 
      className="newWord"
      onClick={ ()=>{
        fetch(request).then(result => result.json()).then(data => setWord(data[0]))
      }
      }>Roll new World</button>
      </div>
    </>
  )
}

function HiddenWord(props){
  
  return(
    <div className="hidden">
      {props.content.split('').map((e,i) =>   <p key={i.toString()}></p>)
    }
      {console.log(props.content)}
    </div>
  )

}


export default App;
