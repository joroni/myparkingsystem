import React, { Component } from 'react';

class Type extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: []
    };
  }

  componentDidMount() {
    this.setState({
      type: [
        {id: '1', name: 'SP'},
        {id: '2', name: 'MP'},
        {id: '3', name: 'LP'}
      ]
    });
  }


  render () {
    const { type } = this.state;

    let typeList = type.length > 0
    	&& type.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.name}</option>
      )
    }, this);

    return (
      <div>
        <select id="lastname" name="lastname" className="form-control">
         <opton></opton>
          {typeList}
        </select>
      </div>
    );
  }
}

export default Type;