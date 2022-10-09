import React from 'react';
import ButtonSubmit from '../Button.jsx';
import { LoginContext } from '../../Context/loginContext.jsx';

export default class SignInForm extends React.Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      loginValue: '',
      passwordValue: '',
      err: {
        active: false,
        message: '',
      },
    };
  }

  render() {
    const { signInRequest } = this.context;

    const handleErr = (active, message) => {
      //!!!! ERR=> ERROR
      this.setState({
        ...this.state,
        err: {
          active: active,
          message: message,
        },
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      handleErr(false, '');
      if (!this.state.loginValue.length || !this.state.passwordValue.length) {
        handleErr(true, 'Empty Values');
        return;
      }

      await signInRequest(this.state.loginValue, this.state.passwordValue).catch(() => handleErr(true, 'Invalid data'));
    };

    const handleLoginInput = (e) => {
      this.setState({ ...this.state, loginValue: e.target.value.trim() });
    };

    const handlePasswordInput = (e) => {
      this.setState({ ...this.state, passwordValue: e.target.value.trim() });
    };
    return (
      <div className="signIn-form--container">
        {this.state.err.active && <div className="error-login">{this.state.err.message}</div>}

        <form className="signIn-form" onSubmit={handleSubmit}>
          <input type="text" value={this.state.loginValue} onChange={handleLoginInput} />
          <input type="password" value={this.state.passwordValue} onChange={handlePasswordInput} />

          <ButtonSubmit text={'Sign In'} />
        </form>
      </div>
    );
  }
}
