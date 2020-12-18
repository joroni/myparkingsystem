import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import 'moment-timezone';
import Moment from 'react-moment';

class CustomerList extends Component {

  constructor(props) {
    super(props);
    this.state = {customers: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/customers')
      .then(response => response.json())
      .then(data => this.setState({customers: data, isLoading: false}));
     
  }

  async remove(id) {
    await fetch(`/api/customer/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedCustomers = [...this.state.customers].filter(i => i.id !== id);
      this.setState({customers: updatedCustomers});
    });
  }

  render() {
    //const dateToFormat = new Date();
    
    const {customers, isLoading} = this.state;
    const types = ["", "SP", "MP", "LP"];
    const lots = ["", "A", "B", "C"];
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const customerList = customers.map(customer => {
      return <tr key={customer.id}>
        <td style={{whiteSpace: 'nowrap'}}>{customer.firstname}</td>
      
        <td>{lots[customer.lotid]}</td>
        <td>{types[customer.typeid]}</td>
        <td><Moment date={customer.starttime} /></td>
        <td>{customer.endtime}</td>
       
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/customers/" + customer.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(customer.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/customers/new">Add Customer</Button>
          </div>
          <h3>Customer List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Vehicle No.</th>
               
                <th width="10%">Lot</th>
                <th width="20%">Type</th>
                <th>Start</th>
                <th>End</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>
            {customerList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default CustomerList;