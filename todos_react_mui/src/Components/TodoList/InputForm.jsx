import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ButtonSubmit from '../Button/Button';
import { selectId } from '../../store/slices/loginSlice';
// import  uniqId  from '../../helpers/uniqueIdGenerator';
import { addTodo, selectTodoStatus } from '../../store/slices/todosSlice';
import Loader  from '../Loader/Loader';

export default function InputForm() {
  const dispatch = useDispatch();
  const userId = useSelector(selectId);

  const postTodo = (text) => {
    const todo = { text: text, completed: false };
    dispatch(addTodo({ userId: userId, todo: todo })); // short
  };

  const status = useSelector(selectTodoStatus);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    postTodo(inputValue); // !
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
            {status === 'loading' ? (
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
