import React from 'react';
import { TodoContext } from '../Context/TodoContext.jsx';
import ButtonSubmit from './Button.jsx';

class InputForm extends React.Component {
  static contextType = TodoContext;

  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
    };
  }

  render() {
    const { addTodo } = this.context;

    const handleSubmit = (e) => {
      e.preventDefault();
      addTodo(this.state.inputVal);
      this.setState({ inputVal: '' });
    };
    const handleInput = (e) => {
      this.setState({ inputVal: e.target.value });
    };

    return (
      <div className="input-component--container">
        <div className="input-form--container">
          <form id="input-form" onSubmit={handleSubmit}>
            <input type="text" value={this.state.inputVal} onChange={handleInput} />
            <ButtonSubmit text={'Add TODO'} isDisabled={!this.state.inputVal.trim().length} />
          </form>
        </div>
      </div>
    );
  }
}

export default InputForm;
