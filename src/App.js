import React from 'react';
import './App.css';
import blob1_Src from '../public/blobs.png';
import blob2_Src from '../public/blob5.png';
import Start from './components/Start';
import Question from './components/Question';

export default function App() {
  const [data, setData] = React.useState([]);
  const [start, setStart] = React.useState(true);
  const [checkAnswers, setCheckAnswers] = React.useState(false);
  const [restartGame, setRestartGame] = React.useState(false);

  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple').then(
      (resp) =>
        resp.json().then((resp) => {
          setData((prev) => {
            const tempHolder = [];
            resp.results.forEach((element) => {
              const options = [
                element.correct_answer,
                ...element.incorrect_answers,
              ];
              const shuffledOptions = options.sort(
                () => Math.random() - 0.5,
              );
              const question = {
                question: element.question,
                answer: element.correct_answer,
                options: shuffledOptions,
                selected: '',
              };
              tempHolder.push(question);
            });
            return tempHolder;
          });
        }),
    );
  }, [restartGame]);
  function handleClick(event, id) {
    setUserAnswer(event, id);
  }
  function setUserAnswer(event, id) {
    const selectedOption = event.currentTarget.firstChild.innerText;
    setData((prevData) =>
      prevData.map((item, index) => {
        return id === index
          ? { ...item, selected: selectedOption }
          : item;
      }),
    );
  }
  function startQuizBtnClick() {
    setStart((prev) => !prev);
  }
  const questions = data.map((question, index) => {
    return (
      <Question
        key={index}
        id={index}
        question={question.question}
        options={question.options}
        handleClick={handleClick}
      />
    );
  });

  return (
    <div className="main-container">
      {start ? <Start handleClick={startQuizBtnClick} /> : questions}

      {!start && (
        <div className="result-container">
          {checkAnswers && (
            <p className="result">You scored 3/5 correct answers</p>
          )}
          <button
            className="result-btn"
            onClick={() => {
              setCheckAnswers((prev) => !prev);
              checkAnswers ? setRestartGame((prev) => !prev) : null;
            }}
          >
            {checkAnswers ? 'Play Again' : 'Check Answers'}
          </button>
        </div>
      )}
      <img
        src={blob1_Src}
        className={start ? 'start-blob1' : 'main-blob1'}
      ></img>
      <img
        src={blob2_Src}
        className={start ? 'start-blob2' : 'main-blob2'}
      ></img>
    </div>
  );
}
