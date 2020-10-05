import React, { Component } from 'react';

class Input extends Component {
 render() {
  return (
   <input
    id={this.props.idName}
    type={this.props.type || 'text'}
    name={this.props.name || null}
    className={this.props.className}
    required={this.props.required || null}
    placeholder={this.props.placeholder || null}
     />
  );
 }
}

export default Input;