import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

import AppNavbar from "./AppNavbar";



class LotEdit extends Component {


  emptyLot = {
    name: "",
    isactive: ""
  };

  empty
  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyLot,
      isactive: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const lot = await (
        await fetch(`/api/lot/${this.props.match.params.id}`)
      ).json();
      this.setState({ 
        item: lot,
        isactive: [
          {id: '1', name: 'Active'},
          {id: '0', name: 'InActive'}
        ]
      });
     
      console.log(lot);
     // this.handleChanges();

   
    }
  }

/*   handleChanges = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
 */
  handleChange(event) {
    const target = event.target;
    const value = target.value;
  //  const label = target.name;
    const name = target.name;
    let item = { ...this.state.item };
  //  let selectedOption =  { ...this.state.selectedOption };
  //  selectedOption[name] = label;
    item[name] = value;
   // this.setState({ item, selectedOption });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    await fetch("/api/lot", {
      method: item.id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    this.props.history.push("/lots");
  }

  render() {
    // this.selectedOption = this.state;
    const { item } = this.state;
    const { isactive } = this.state;
    
    const title = <h2>{item.id ? "Edit Lot" : "Add Lot"}</h2>;
   
    
    let isactivesList = isactive.length > 0 && isactive.map((item, i) => {
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
              <Label for="isactive">Is Active</Label>
              {/* <Input type="text" name="isactive" id="isactive" value={item.isactive || ''}
                   onChange={this.handleChange} autoComplete="isactive"/> */}
            <div>
        <select id="isactive" name="isactive" className="form-control">
          {isactivesList}
        </select>
      </div>
            </FormGroup>

            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/lots">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(LotEdit);
