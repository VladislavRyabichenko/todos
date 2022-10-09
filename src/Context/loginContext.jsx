import React, { Component } from 'react';
import loginRequest from '../DATA_BASE/DB';

export const LoginContext = React.createContext();

export default class LoginContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogined: false,
      currentUser: {
        login: null,
        id: null,
      },
    };
  }

  async signInRequest(login, password) {
    const res = await loginRequest(login, password).catch(() => {
      throw new Error('failed req');
    });
    this.setState({
      ...this.state,
      isLogined: true,
      currentUser: {
        login: res.login,
        id: res.id,
      },
    });
  }

  render() {
    return (
      <LoginContext.Provider value={{ ...this.state, signInRequest: this.signInRequest.bind(this) }}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}
