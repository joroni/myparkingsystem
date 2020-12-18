import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import 'moment-timezone';
//import Moment from 'react-moment';

class SpotList extends Component {

  constructor(props) {
    super(props);
    this.state = {spots: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/spots')
      .then(response => response.json())
      .then(data => this.setState({spots: data, isLoading: false}));
     
  }

  async remove(id) {
    await fetch(`/api/spot/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedSpots = [...this.state.spots].filter(i => i.id !== id);
      this.setState({spots: updatedSpots});
    });
  }

  render() {
    //const dateToFormat = new Date();
    
    const {spots, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const spotList = spots.map(spot => {
      return <tr key={spot.id}>
        <td style={{whiteSpace: 'nowrap'}}>{spot.name}</td>
      
       
        <td>{spot.spotid}</td>
        <td>{spot.state}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/spots/" + spot.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(spot.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/spots/new">Add Spot</Button>
          </div>
          <h3>Spot List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Spot Name</th>
               
                <th width="10%">Spot No</th>
                <th width="10%">State</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>
            {spotList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default SpotList;