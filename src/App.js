import React from 'react';
import './App.css';
import yellow_blob_Src from '../public/blobs.png';
import blue_blob_Src from '../public/blob5.png';
import StartPage from './components/StartPage';
import Button from './components/Button';
import { nanoid } from 'nanoid';

export default function App() {
  // this initial array needs to have five blank string so they can be replaced by users quiz choices
  const initialChoicesArray = ['', '', '', '', ''];
  const initialOptionsArray = [0, 0, 0, 0, 0];

  const [options, setOptions] = React.useState(initialOptionsArray);
  const [questions, setQuestions] = React.useState([]);

  const [quiz, setQuiz] = React.useState(false);
  const [quizData, setQuizData] = React.useState([]);

  const [message, setMessage] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [correctAnswers, setCorrectAnswers] = React.useState([]);
  const [choices, setChoices] = React.useState(initialChoicesArray);

  const [answered, setAnswered] = React.useState(false);
  // This is the initial Api Call that gets the raw data
  React.useEffect(() => {
    if (!quiz) {
      fetch('https://opentdb.com/api.php?amount=5&type=multiple')
        .then((res) => res.json())
        .then((data) => setQuizData(data.results));
    }
  }, [quiz]);
  //This is where data is sorted out in to various state variables
  React.useEffect(() => {
    const tempQuestions = [];

    const tempCorrectAnswersArray = [];
    quizData.map((item, index) => {
      //Correct Answers
      // create correctAnswers container
      // push correct answers
      // set correctAnswers state variable
      const correctAnswers = item.correct_answer;
      tempCorrectAnswersArray.push(correctAnswers);
      setCorrectAnswers(tempCorrectAnswersArray);

      // Wrong Answers
      // create a wrong answer container
      // push wrong answers
      // get the associated correct answer
      // push the correct answer into the wrong answer array
      // shuffle it
      // This lets you have four options 3 wrong options and the correct option in one place
      // This is done so as to let you be able to render all four of the options in one go
      // on the button component

      const wrongAnswers = item.incorrect_answers; // This is an array
      const wrongAnswersArray = wrongAnswers.map((item) => {
        return {
          name: item,
          isCorrect: false,
          id: nanoid(),
          index: index,
        };
      });

      const correctAnswer = {
        name: item.correct_answer,
        isCorrect: true,
        id: nanoid(),
        index: index,
      };
      wrongAnswersArray.push(correctAnswer);
      shuffle(wrongAnswersArray);

      // Questions
      // create a question object
      // add the answers array to it
      // enventually set the questions state variable

      const questionObject = {
        question: item.question,
        answers: wrongAnswersArray,
      };
      return tempQuestions.push(questionObject);
    });
    setQuestions(tempQuestions);
  }, [quizData]);

  function startQuiz() {
    setQuiz(true);
  }

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function checkAnswers(correctAnswers, choices) {
    setCount(0);
    if (choices.includes('')) {
      setMessage(true);
    }
    for (let i = 0; i < correctAnswers.length; i++) {
      if (correctAnswers[i] === choices[i]) {
        setCount((prevState) => prevState + 1);
      } else if (!choices.includes('')) {
        setAnswered(true);
        setMessage(false);
      }
    }
  }

  const quizQuestions = questions.map((item) => {
    const answerOptions = item.answers.map((item) => {
      return (
        <Button
          fixedAnswers={item.name}
          id={item.id}
          key={item.id}
          index={item.index}
          isCorrect={item.isCorrect}
          answered={answered}
          choices={choices}
          setChoices={setChoices}
          options={options}
          setOptions={setOptions}
          active={options[item.index] === item.id ? true : false}
        />
      );
    });
    return (
      <div className="question-group">
        <h2 dangerouslySetInnerHTML={{ __html: item.question }} />
        <div className="button-container">{answerOptions}</div>
      </div>
    );
  });

  const resetGame = () => {
    setQuiz(false);
    setAnswered(false);
    // The function call below modifies state directly.
    // This is not standard practice
    setChoices(initialChoicesArray);
  };

  return (
    <div className="App">
      <div className="landing-container">
        <img src={yellow_blob_Src} className="yellow-blob"></img>
        <img src={blue_blob_Src} className="blue-blob"></img>

        {!quiz && <StartPage onStart={() => startQuiz()} />}
        <div className="quiz-container">
          {quiz && quizQuestions}
          {message && (
            <p className="message">You must answer all questions!</p>
          )}
          {quiz && !answered && (
            <button
              className="quizzical-button"
              onClick={() => checkAnswers(correctAnswers, choices)}
            >
              Check answers
            </button>
          )}
          {answered && (
            <div className="play-again-container">
              <p>You scored {count}/5 correct answers</p>
              <button
                className="quizzical-button"
                onClick={() => resetGame()}
              >
                Play again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
