import React from 'react';
import TodoContextProvider from './Context/TodoContext.jsx';
import InputForm from './Components/InputForm.jsx';
import List from './Components/List.jsx';
import { LoginContext } from './Context/loginContext.jsx';
import SignInForm from './Components/LoginForm/SignInForm.jsx';

class App extends React.Component {
  static contextType = LoginContext;

  render() {
    const { isLogined } = this.context;

    if (!isLogined) {
      return <SignInForm />;
    }
    return (
      <TodoContextProvider id={this.context.currentUser.id}>
        <div className="app">
          <InputForm />
          <List />
        </div>
      </TodoContextProvider>
    );
  }
}

export default App;
