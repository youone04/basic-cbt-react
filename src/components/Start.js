import React from 'react';

const Start = ({ onQuizStart }) => {
  return(
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h1>Mulai Quiz</h1>
          <p>Semoga sukess!</p>
          <button className="button is-success is-medium" onClick={onQuizStart}>mulai</button>
        </div>
      </div>
    </div>
  );
}

export default Start;