import React from 'react';

class ButtonSubmit extends React.Component {
  render() {
    return (
      <button type="submit" disabled={this.props.isDisabled}>
        <span>{this.props.text}</span>
      </button>
    );
  }
}

export default ButtonSubmit;
