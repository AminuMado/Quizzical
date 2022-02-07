import React from 'react';
import './App.css';
import blob1_Src from '../public/blobs.png';
import blob2_Src from '../public/blob5.png';
import Start from './components/Start';
import Question from './components/Question';

export default function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple').then(
      (resp) =>
        resp.json().then((resp) => {
          setData((prev) => {
            const tempHolder = [];
            resp.results.forEach((element) => {
              const question = {
                question: element.question,
                answer: element.correct_answer,
                options: [
                  element.correct_answer,
                  ...element.incorrect_answers,
                ],
                selected: '',
              };
              tempHolder.push(question);
            });
            return tempHolder;
          });
        }),
    );
  }, []);
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

  const questions = data.map((question, index) => (
    // shuffle the options array here
    <Question
      key={index}
      id={index}
      question={question.question}
      options={question.options}
      handleClick={handleClick}
    />
  ));

  return (
    <div className="main-container">
      {questions}
      <div className="result-container">
        <p className="result"></p>
        <button className="result-btn"></button>
      </div>
      <img src={blob1_Src} className="start-blob1"></img>
      <img src={blob2_Src} className="start-blob2"></img>
    </div>
  );
}
