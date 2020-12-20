import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
// import Select from "react-select";
//import IsActive from './IsActive';
import AppNavbar from "./AppNavbar";


class SpotEdit extends Component {


  emptySpot = {
    name: "",
    spotid:"",
    state:""
  };


  emptyLot = {
    id: "",
    name: "",
  };


  constructor(props) {
    super(props);
    this.state = {
      item: this.emptySpot,
      lotid: this.emptyLot,
      state:[],
      selectedOption: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const spot = await (
        await fetch(`/api/spot/${this.props.match.params.id}`)
      ).json();
      const lot = await (await fetch(`/api/lots`)).json();
      

      this.setState({ 
        item: spot,
        lotid: lot
      });
      
      console.log(spot);
     // this.handleChanges();
    
    }
  }

  
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const label = target.name;
    const name = target.name;
    let item = { ...this.state.item };
    let selectedOption =  { ...this.state.selectedOption };
    selectedOption[name] = label;
    item[name] = value;
    this.setState({ item, selectedOption });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    await fetch("/api/spot", {
      method: item.id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    this.props.history.push("/spots");
  }

  render() {
    // this.selectedOption = this.state;
    const { item, lotid } = this.state;
    const title = <h2>{item.id ? "Edit Spot" : "Add Spot"}</h2>;
    const states =  [{id: '1', name: 'Active'},
    {id: '0', name: 'InActive'}];

    let lotList = lotid.length > 0 && lotid.map((item, i) => {
      return (
        <option key={i} value={item.id}>
          {item.name}
        </option>
      );
    }, this);

     
    
    let stateList = states.length > 0 && states.map((item, i) => {
    return (
      <option key={i} value={item.id}>{item.name}</option>
    )
  }, this);



    return (
      <div>
        <AppNavbar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>

          <FormGroup>
              <Label for="lotid">Lot</Label>
              <select
                id="lotid"
                value={item.lotid}
                name="lotid"
                onChange={this.handleChange}
                className="form-control"
              >
                <option></option>
                {lotList}
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={item.name || ""}
                onChange={this.handleChange}
                autoComplete="name"
              />
            </FormGroup>

            <FormGroup>
              <Label for="spotid">Spot ID</Label>
              <Input
                type="number"
                name="spotid"
                id="spotid"
                value={item.spotid || ""}
                onChange={this.handleChange}
                autoComplete="spotid"
              />
            </FormGroup>
            <FormGroup>
              <Label for="state">State</Label>
              <select
                id="state"
                value={item.state}
                name="state"
                onChange={this.handleChange}
                className="form-control"
              >
                <option></option>
                {stateList}
              </select>
            </FormGroup>
            
            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/spots">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(SpotEdit);