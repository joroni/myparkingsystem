import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class TypeList extends Component {

  constructor(props) {
    super(props);
    this.state = {types: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/types')
      .then(response => response.json())
      .then(data => this.setState({types: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/type/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedTypes = [...this.state.types].filter(i => i.id !== id);
      this.setState({types: updatedTypes});
    });
  }

  render() {
    const {types, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const typeList = types.map(type => {
      return <tr key={type.id}>
        <td style={{whiteSpace: 'nowrap'}}>{type.name}</td>
     
       
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/types/" + type.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(type.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/types/new">Add Type</Button>
          </div>
          <h3>Type List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Name</th>
               
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>
            {typeList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default TypeList;