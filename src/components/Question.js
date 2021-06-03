import React, { useState, useEffect, useRef} from 'react';
import { formatTime } from '../utils';

const Question = ({ data, onAnswerUpdate, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep,time }) => {


  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const radiosWrapper = useRef();

  useEffect(() => {
    const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
    if(findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data]);

  const changeHandler = (e) => {
    setSelected(e.target.value);
    if(error) {
      setError('');
    }
  }
  
  const nextClickHandler = (e) => {
    if(selected === '') {
      return setError('Silahkan Pilih Jawaban Terlebih Dahulu!');
    }
    onAnswerUpdate(prevState => [...prevState, { q: data.question, a: selected }]);
    setSelected('');
    if(activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion + 1);
    }else {
      onSetStep(3);
    }
  }
  useEffect(() => {
    return () => {
      if(formatTime(time) === '1m 0s'){
        onSetStep(3);
      }
    }
  })

  

  return(
    <>
    <div style={{display:'table-row'}}>
    <div >
    <h5 style={{textAlign:'center',marginBottom:20,fontSize: 30,}}>{formatTime(time)}</h5>
    <h3 style={{textAlign:'center',color:'green',fontWeight:'bold'}}>Waktu Anda 1 Menit untuk mengerjakan</h3>
    </div>
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h2 className="mb-5">{data.question}</h2>
          <div className="control" ref={radiosWrapper}>
            {data.choices.map((choice, i) => (
              <label className="radio has-background-light" key={i}>
                <input type="radio" name="answer" value={choice} onChange={changeHandler} />
                {choice}
              </label>
            ))}
          </div>
          {error && <div className="has-text-danger">{error}</div>}
          <button className="button is-warning is-medium is-fullwidth mt-4" onClick={nextClickHandler}>Selanjutnya</button>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}

export default Question;