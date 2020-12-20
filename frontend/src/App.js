import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomerList from './CustomerList';
import LotList from './LotList';
import CustomerEdit from './CustomerEdit';
import LotEdit from './LotEdit';
import TypeList from './TypeList';
import TypeEdit from './TypeEdit';
import SpotList from './SpotList';
import SpotEdit from './SpotEdit';

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
          <Route path='/types' exact={true} component={TypeList}/>
          <Route path='/types/:id' component={TypeEdit}/>
          <Route path='/spots' exact={true} component={SpotList}/>
          <Route path='/spots/:id' component={SpotEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;