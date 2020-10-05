import React, { Component } from 'react';

class Label extends Component {
 render() {
  return (
   <label
    id={this.props.idName}
    for={this.props.htmlFor}
    className={this.props.className}>
     {this.props.label}
    </label> 
  );
 }
}

export default Label;