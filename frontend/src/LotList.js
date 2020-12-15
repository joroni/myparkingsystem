import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class LotList extends Component {

  constructor(props) {
    super(props);
    this.state = {lots: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/lots')
      .then(response => response.json())
      .then(data => this.setState({lots: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/lot/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedLots = [...this.state.lots].filter(i => i.id !== id);
      this.setState({lots: updatedLots});
    });
  }

  render() {
    const {lots, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const lotList = lots.map(lot => {
      return <tr key={lot.id}>
        <td style={{whiteSpace: 'nowrap'}}>{lot.name}</td>
        <td>{lot.isactive}</td>
       
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/lots/" + lot.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(lot.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/lots/new">Add Lot</Button>
          </div>
          <h3>Lot List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Name</th>
                <th width="20%">Is Active</th>
               
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>
            {lotList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default LotList;