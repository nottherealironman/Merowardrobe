import React, { Component } from 'react';

class Select extends React.Component {
 render() {
  // Get all options from option prop
  const selectOptions = this.props.options.split(', ');

  // Generate list of options
  const selectOptionsList = selectOptions.map((selectOption, index) => {
   return <option key={index} value={index}>{selectOption}</option>
  });

  return (
   <fieldset>
    <Label
     hasLabel={this.props.hasLabel}
     htmlFor={this.props.htmlFor}
     label={this.props.label}
    />
 
    <select
     defaultValue=''
     id={this.props.htmlFor}
     name={this.props.name || null}
     required={this.props.required || null}
    >
     <option value='' disabled>Select one option</option>

     {selectOptionsList}
    </select>
   </fieldset>
  );
 }
}

export default Select;