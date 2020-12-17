import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
// import Select from "react-select";
//import IsActive from './IsActive';
import AppNavbar from "./AppNavbar";


const options = [
  {
    label: "Active",
    value: 1,
  },
  {
    label: "Inactive",
    value: 0,
  },
];

class TypeEdit extends Component {


  emptyType = {
    name: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyType,
      selectedOption: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const type = await (
        await fetch(`/api/type/${this.props.match.params.id}`)
      ).json();
      this.setState({ item: type });
      
      console.log(type);
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
    await fetch("/api/type", {
      method: item.id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    this.props.history.push("/types");
  }

  render() {
    // this.selectedOption = this.state;
    const { item } = this.state;
    const title = <h2>{item.id ? "Edit Type" : "Add Type"}</h2>;

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
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/types">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(TypeEdit);
