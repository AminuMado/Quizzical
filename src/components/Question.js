import React from 'react';

export default function Question(props) {
  return (
    <div className="question-container">
      <div className="question">
        <p>{props.question}</p>
      </div>
      <div className="options">
        <button className="option-btn">{props.options[0]}</button>
        <button className="option-btn">{props.options[1]}</button>
        <button className="option-btn">{props.options[2]}</button>
        <button className="option-btn">{props.options[3]}</button>
      </div>
    </div>
  );
}
