import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./AppNavbar";
import "moment-timezone";
import Moment from "react-moment";

class CustomerEdit extends Component {
  emptyCustomer = {
    firstname: "",
    typeid: "",
    lotid: [],
    endtime: "",
    copyrigtby: "",
  };

  emptyType = {
    id: "",
    name: "",
  };

  emptyLot = {
    id: "",
    name: "",
  };

  //endTime = "";

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyCustomer,
      lotid: this.emptyLot,
      typeid: this.emptyType,
      //  endtime: this.endTime,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const customer = await (
        await fetch(`/api/customer/${this.props.match.params.id}`)
      ).json();
      const lot = await (await fetch(`/api/lots`)).json();
      const type = await (await fetch(`/api/types`)).json();
      const endtime = this.endtime;
      this.setState({
        item: customer,
        lotid: lot,
        typeid: type,
        endtime: endtime,
      });
      //z this.handleRelease();
    }
    if (this.props.match.params.id === "new") {
      const lot = await (await fetch(`/api/lots`)).json();
      const type = await (await fetch(`/api/types`)).json();
      this.setState({
        lotid: lot,
        typeid: type,
      });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    let lot = { ...this.state.lot };
    this.setState({ item, lot });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;

    await fetch("/api/customer", {
      method: item.id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    this.props.history.push("/customers");
  }

  render() {
    const { item, lotid, typeid } = this.state;
    const timeStart = (
      <Moment format="YYYY-MM-DD HH:mm">{item.starttime}</Moment>
    );
    const timeEnd = <Moment  className="form-control"  format="YYYY-MM-DD HH:mm">{item.endtime}</Moment>;

    const title = <h2>{item.id ? "Edit Customer" : "Add Customer"}</h2>;
    const timer = (
      <div>
        {item.id ? (
          <FormGroup>
            <Label for="starttime">Start</Label>
            <p className="form-control" >{timeStart}</p>
          </FormGroup>
        ) : (
          ""
        )}
      </div>
    );
    const endtimer = (
      <div>
        {item.id ? (
          <FormGroup>
            <Label for="endtime">End</Label>
            <div className="row">
              <div className="col">
                <Input
                  type="datetime-local"
                  name="endtime"
                  id="endtime"
                  value={item.endtime || ""}
                  onChange={this.handleChange}
                  autoComplete="endtime"
                />
              </div>
            </div>
          </FormGroup>
        ) : (
          ""
        )}
      </div>
    );

    let lotList =
      lotid.length > 0 &&
      lotid.map((item, i) => {
        return (
          <option key={i} value={item.id}>
            {item.name}
          </option>
        );
      }, this);

    let typeList =
      typeid.length > 0 &&
      typeid.map((item, i) => {
        return (
          <option key={i} value={item.id}>
            {item.name}
          </option>
        );
      }, this);

    return (
      <div>
        <AppNavbar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="firstname">Vehicle No.</Label>
              <Input
                type="text"
                name="firstname"
                id="firstname"
                value={item.firstname || ""}
                onChange={this.handleChange}
                autoComplete="firstname"
              />
            </FormGroup>
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
              <Label for="typeid">Type</Label>
              <select
                id="typeid"
                value={item.typeid}
                name="typeid"
                onChange={this.handleChange}
                className="form-control"
              >
                <option></option>
                {typeList}
              </select>
            </FormGroup>
            {timer}
            {endtimer}
            <FormGroup>
              <Label for="difference">Total Hour(s)</Label>
              <Moment className="form-control" diff={item.starttime} unit="hours">
                {item.endtime}
              </Moment>
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/customers">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(CustomerEdit);