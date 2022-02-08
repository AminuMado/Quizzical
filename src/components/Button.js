import React from 'react';

export default function Button(props) {
  const clickHandler = () => {
    // array for highlighting pick on click for each button group
    const options = [...props.options];
    options.splice(props.index, 1, props.id);
    props.setOptions(options);

    // array for storing chosen answer
    const newChoices = [...props.choices];
    newChoices.splice(props.index, 1, props.fixedAnswers);
    props.setChoices(newChoices);
  };

  return (
    <button
      className={`answers-btn 
          ${props.active && 'blue'}
          ${props.answered && 'faded'}
          ${props.active && props.answered && 'green'}
          ${props.answered && props.isCorrect && 'green'} 
          ${
            props.active &&
            props.answered &&
            !props.isCorrect &&
            'red'
          }
          `}
      onClick={() => clickHandler()}
      disabled={props.answered ? true : false}
      key={props.id}
    >
      {props.fixedAnswers}
    </button>
  );
}
