import React, { Component } from 'react';

class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {    
        this.setState({value:  JSON.parse(window.localStorage.getItem("bill"))}); 
        console.log({value: JSON.parse(window.localStorage.getItem("bill"))})
 }
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
          <input type="button" value="Submit" />
        </form>
      );
    }
  }


  export default NameForm