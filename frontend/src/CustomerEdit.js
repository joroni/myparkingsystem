import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
//import Type from './Type';

class CustomerEdit extends Component {

  emptyCustomer = {
    firstname: '',
    typeid: '',
    lotid: [],
    address: '',
    copyrigtby: ''
  };


  
  emptyType ={
    id:'',
    name:''
  }

  emptyLot ={
    id:'',
    name:''
  }

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyCustomer,
      lotid:this.emptyLot,
      typeid:this.emptyType
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const customer = await (await fetch(`/api/customer/${this.props.match.params.id}`)).json();
      const lot = await (await fetch(`/api/lots`)).json();
      const type = await (await fetch(`/api/types`)).json();
      this.setState({
        item: customer,
        lotid:lot,
        typeid:type
      });

       
    }
    if (this.props.match.params.id === 'new') {
     
      const lot = await (await fetch(`/api/lots`)).json();
      this.setState({
        lotid:lot
      });

       
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    let lot = {...this.state.lot};
    this.setState({item, lot});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/customer', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/customers');
  }

  render() {
    const {item, lotid, typeid} = this.state;
    const title = <h2>{item.id ? 'Edit Customer' : 'Add Customer'}</h2>;
    

    let lotList = lotid.length > 0
    	&& lotid.map((item, i) => {
       return (
        <option key={i} value={item.id}>{item.name}</option>
      ) 
    }, this);

    let typeList = typeid.length > 0
    && typeid.map((item, i) => {
     return (
      <option key={i} value={item.id}>{item.name}</option>
    ) 
  }, this);

   
    
  
    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="firstname">Firstname</Label>
            <Input type="text" name="firstname" id="firstname" value={item.firstname || ''}
                   onChange={this.handleChange} autoComplete="firstname"/>
          </FormGroup>
          <FormGroup>
            <Label for="typeid">Type</Label>
            <select id="typeid"  value={item.typeid} name="typeid"  onChange={this.handleChange} className="form-control">
          <option></option>
          {typeList}
        </select>
             </FormGroup>          
          <FormGroup>
            <Label for="lotid">Lot</Label>

            <select id="lotid"  value={item.lotid} name="lotid"  onChange={this.handleChange} className="form-control">
          <option></option>
          {lotList}
        </select>
            </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="text" name="address" id="address" value={item.address || ''}
                   onChange={this.handleChange} autoComplete="address"/>
          </FormGroup>
          <FormGroup>
          
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/customers">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(CustomerEdit);