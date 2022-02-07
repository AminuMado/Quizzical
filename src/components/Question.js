import React from 'react';

export default function Question(props) {
  const [activeButton, setActiveButton] = React.useState('');

  return (
    <div className="question-container">
      <div className="question">
        <h2 dangerouslySetInnerHTML={{ __html: props.question }} />
      </div>
      <div className="options">
        <button
          className={
            activeButton === 'button-1'
              ? `active option-btn`
              : 'option-btn'
          }
          onClick={(event) => {
            props.handleClick(event, props.id);
            setActiveButton('button-1');
          }}
        >
          <p dangerouslySetInnerHTML={{ __html: props.options[0] }} />
        </button>
        <button
          className={
            activeButton === 'button-2'
              ? `active option-btn`
              : 'option-btn'
          }
          onClick={(event) => {
            props.handleClick(event, props.id);
            setActiveButton('button-2');
          }}
        >
          <p dangerouslySetInnerHTML={{ __html: props.options[1] }} />
        </button>
        <button
          className={
            activeButton === 'button-3'
              ? `active option-btn`
              : 'option-btn'
          }
          onClick={(event) => {
            props.handleClick(event, props.id);
            setActiveButton('button-3');
          }}
        >
          <p dangerouslySetInnerHTML={{ __html: props.options[2] }} />
        </button>
        <button
          className={
            activeButton === 'button-4'
              ? `active option-btn`
              : 'option-btn'
          }
          onClick={(event) => {
            props.handleClick(event, props.id);
            setActiveButton('button-4');
          }}
        >
          <p dangerouslySetInnerHTML={{ __html: props.options[3] }} />
        </button>
      </div>
    </div>
  );
}
