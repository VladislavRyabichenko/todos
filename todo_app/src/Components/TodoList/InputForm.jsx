import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonSubmit from '../Button/Button';
import { selectId } from '../../store/slices/loginSlice';
import { addTodo, selectTodoStatus } from '../../store/slices/todosSlice';
import Loader from '../Loader/Loader';
import { STATUS_LOADING } from '../../constants/values';

export default function InputForm() {
  const dispatch = useDispatch();
  const userId = useSelector(selectId);

  const status = useSelector(selectTodoStatus);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const todo = { text: inputValue, completed: false };

    dispatch(addTodo({ userId, todo }));
    setInputValue('');
  };
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="input-component--container">
      <div className="input-form--container">
        <form id="input-form" onSubmit={handleSubmit}>
          <div className="input-form--input-container">
            <input type="text" value={inputValue} onChange={handleInput} />
          </div>
          <div className="input-form--input--button-container">
            {status === STATUS_LOADING ? (
              <Loader />
            ) : (
              <ButtonSubmit text={'Add TODO'} isDisabled={!inputValue.trim().length} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
