import React, { Component } from 'react';

class IsActive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isactive: []
    };
  }

  componentDidMount() {
    this.setState({
      isactive: [
        {id: '1', name: 'Active'},
        {id: '0', name: 'InActive'}
      ]
    });
  }


  render () {
    const { isactive } = this.state;

    let isactivesList = isactive.length > 0
    	&& isactive.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.name}</option>
      )
    }, this);

    return (
      <div>
        <select id="isactive" name="isactive" className="form-control">
          {isactivesList}
        </select>
      </div>
    );
  }
}

export default IsActive;