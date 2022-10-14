import React, { useContext, useState } from 'react';
import { TodoContext } from '../Context/TodoContext';
import ButtonSubmit from './Button';

export default function InputForm() {
  const { addTodo } = useContext(TodoContext);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(inputValue);
    setInputValue('');
  };
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="input-component--container">
      <div className="input-form--container">
        <form id="input-form" onSubmit={handleSubmit}>
          <input type="text" value={inputValue} onChange={handleInput} />
          <ButtonSubmit text={'Add TODO'} isDisabled={!inputValue.trim().length} />
        </form>
      </div>
    </div>
  );
}
