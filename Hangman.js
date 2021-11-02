import React from 'react';

function Hangman(){
    return(
      <div className="hangman">
        <div className="hangman_bar_bottom"></div>
        <div className="hangman_bar_vertical"></div>
        <div className="hangman_bar_top"></div>
        <div className="hangman_rope"></div>
        <div className="hangman_head"></div>
        <div className="hangman_body"></div>
        <div className="hangman_hand_1"></div>
      </div> 
    )
}
export default Hangman;