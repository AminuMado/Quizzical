import React from 'react';

export default function StartPage(props) {
  return (
    <div className="flex-wrapper">
      <div className="content">
        <h1>Quizzical</h1>
        <p>
          Test your knowledge! When you start the quiz, you will have
          to answer 5 random questions.Lets see how much trivia you
          have in you. Good luck!
        </p>
        <button className="start-button" onClick={props.onStart}>
          Start quiz!
        </button>
      </div>
      <div className="footer">
        <footer>
          <p>Copyright © 2022 AminuMado</p>
          <a href="https://github.com/AminuMado" target="_blank">
            <i className="fab fa-github github-logo"></i>
          </a>
        </footer>
      </div>
    </div>
  );
}
