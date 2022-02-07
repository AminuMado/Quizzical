import React from 'react';
import blob1_Src from '../../public/blobs.png';
import blob2_Src from '../../public/blob5.png';
export default function Start(props) {
  return (
    <div className="start-container">
      <h1>Quizzical</h1>
      <p>
        This is quiz based game.Try it out, Its fun.Lets see how much
        trivia you have in you
      </p>
      <button className="start-quiz-btn" onClick={props.handleClick}>
        {' '}
        Start Quiz
      </button>
    </div>
  );
}
