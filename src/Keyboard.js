import React from 'react';

function Keyboard(props){
    return(
        <div className='keyboard'>
            {props.content.map((e,i)=> <button key={i}>{e}</button>)}
        </div>
    )
}

export default Keyboard;