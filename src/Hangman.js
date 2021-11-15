import React from 'react';

function Hangman(props){
  const hangmanParts = [
    "hangman_bar_bottom",
    "hangman_bar_vertical",
    "hangman_bar_top",
    "hangman_rope",
    "hangman_head",
    "hangman_body",
    "hangman_hand_1",
    "hangman_hand_2",
    "hangman_leg_1",
    "hangman_leg_2",


  ]
    return(
      <div className="hangman">
        {

          hangmanParts.map((e,i) => props.count > i ? <div key={i} className={e}/> : null)
        }

        
      </div> 
    )
      }


export default Hangman;