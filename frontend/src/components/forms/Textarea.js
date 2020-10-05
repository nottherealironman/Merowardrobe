import React, { Component } from 'react';

class Textarea extends Component {
 render() {
  return (
    <textarea
     id={this.props.idName}
     name={this.props.name || null}
     cols={this.props.cols || null}
     rows={this.props.rows || null}
     className={this.props.className}
     required={this.props.required || null}
     placeholder={this.props.placeholder || null}
    >
    {this.props.value}
    </textarea>
  );
 }
}

export default Textarea;