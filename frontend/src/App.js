import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomerList from './CustomerList';
import LotList from './LotList';
import CustomerEdit from './CustomerEdit';
import LotEdit from './LotEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/customers' exact={true} component={CustomerList}/>
          <Route path='/customers/:id' component={CustomerEdit}/>
          <Route path='/lots' exact={true} component={LotList}/>
          <Route path='/lots/:id' component={LotEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;