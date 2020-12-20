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
    starttime: "",
    endtime: "",
    timediff: "",
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
    let bill = JSON.parse(localStorage.getItem("bill"));
    this.state = {
      item: this.emptyCustomer,
      lotid: this.emptyLot,
      typeid: this.emptyType,
      bill: bill,
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
      const bill = localStorage.getItem("bill");
      const endtime = this.endtime;
      const starttime = this.starttime;
      const timediff = this.timediff;
      //const bill = this.bill;
      this.setState({
        item: customer,
        lotid: lot,
        typeid: type,
        starttime: starttime,
        endtime: endtime,
        timediff: timediff,
        bill: bill,
      });
      // this.handleRelease();
    }
    if (this.props.match.params.id === "new") {
      const lot = await (await fetch(`/api/lots`)).json();
      const type = await (await fetch(`/api/types`)).json();
      const bill = localStorage.getItem("bill");
      this.setState({
        lotid: lot,
        typeid: type,
        bill: bill,
      });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let timediff = this.state.timediff;
    let bill = this.state.value;
    let item = { ...this.state.item };
    item[name] = value;
    let lot = { ...this.state.lot };
    this.setState({ item, lot, timediff, bill });
    // this.tariff(this.typeid, this.quanTity);
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

  hello() {
    alert("hi");
  }

  test(typeId, dates1, dates2) {
    let penalty = "";
    let typeid = parseInt(typeId);
    let price = "";
    let bill = this.bill;
    const date1 = new Date(dates1);
    const date2 = new Date(dates2);
    console.log(getDifferenceInDays(date1, date2));
    console.log(getDifferenceInHours(typeid, date1, date2));

    /*  console.log(getDifferenceInMinutes(date1, date2));
    console.log(getDifferenceInSeconds(date1, date2));
 */
    function getDifferenceInDays(date1, date2) {
      const diffInMs = Math.abs(date2 - date1);
      return diffInMs / (1000 * 60 * 60 * 24);
    }

    function getDifferenceInHours(typeId, date1, date2) {
      const diffInMs = Math.abs(date2 - date1);
      return diffInMs / (1000 * 60 * 60);
    }
    const qnTity = getDifferenceInHours(typeId, date1, date2);
    const quanTity = Math.round(qnTity);
    localStorage.setItem("diff ", quanTity);
    console.log("quantity ", quanTity);
    console.log("type ", typeId);
    /*    function getDifferenceInMinutes(date1, date2) {
      const diffInMs = Math.abs(date2 - date1);
      return diffInMs / (1000 * 60);
    }

    function getDifferenceInSeconds(date1, date2) {
      const diffInMs = Math.abs(date2 - date1);
      return diffInMs / 1000;
    }
 */

    // eslint-disable-next-line eqeqeq

    if (quanTity <= 3) {
      // eslint-disable-next-line no-const-assign
      price = 40;
      // eslint-disable-next-line no-const-assign
      const bill = price;
      console.log("Bill", bill);
      localStorage.setItem("bill ", bill);
      // return bill;
    }

    // eslint-disable-next-line eqeqeq
    if (typeId == 1 && quanTity > 3) {
      price = 40;
      penalty = price * quanTity;
      bill = penalty;
      console.log("Bill", bill);
      localStorage.setItem("bill ", bill);
      //  return bill;
    }

    // eslint-disable-next-line eqeqeq
    if (typeId == 2 && quanTity > 3) {
      price = 60;
      penalty = price * quanTity;
      bill = penalty;
      console.log("Bill", bill);
      localStorage.setItem("bill ", bill);
      //  return bill;
    }
    // eslint-disable-next-line eqeqeq
    if (typeId == 3 && quanTity > 3) {
      console.log(quanTity);
      price = 100;
      penalty = price * quanTity;
      bill = penalty;
      console.log("Bill", bill);
      localStorage.setItem("bill ", bill);
      //  return bill;
    }

    if (quanTity > 23) {
      penalty = 5000;
      bill = penalty;
      console.log("Bill", bill);
      localStorage.setItem("bill ", bill);
      //  return bill;
    }
  }

  render() {
    const { item, lotid, typeid } = this.state;
    const timeStart = (
      <Moment format="YYYY-MM-DD HH:mm" date={item.starttime} />
    );
    //const timediff = JSON.parse(localStorage.getItem("diff"));

    const timeEnd = <Moment format="YYYY-MM-DD HH:mm" date={item.endtime} />;
    //const timestayed = timeEnd.diff(timeStart, 'days');

    const title = <h2>{item.id ? "Edit Customer" : "Add Customer"}</h2>; //const timestayed = discharge.diff(admission, 'days');

    /*  const admission = Moment('{item.starttime}', 'DD-MM-YYYY'); 
    const discharge = Moment('{item.endtime}', 'DD-MM-YYYY');
     */ const timer = (
      <div>
        {item.id ? (
          <FormGroup>
            <Label for="starttime">Start</Label>
            <p className="form-control">{timeStart}</p>
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
                <label>Initial</label>
                <p className="form-control"> {timeEnd}</p>
              </div>
              <div className="col">
                <label>Actual</label>

                <Input
                  className="form-control"
                  type="datetime-local"
                  name="endtime"
                  id="endtime"
                  value={
                    item.endtime || (
                      <Moment
                        name="timediff"
                        className="form-control"
                        diff={item.starttime}
                        unit="hours"
                      >
                        {item.endtime}
                      </Moment>
                    )
                  }
                  onChange={this.handleChange}
                  //  onClick={this.tariff(item.typeid, item.starttime, item.endtime)}

                  autoComplete="endtime"
                />
              </div>
              <div className="col">
                <label>_</label>
                {/*  <Button
                className="form-control"
                color="danger"
                type="button" 
                onClick={this.test(item.typeid.toString(), item.starttime, item.endtime)}
              >
                Calculate
              </Button> */}
                <Button
                  className="form-control"
                  color="danger"
                  type="button"
                  onClick={this.hello()}
                >
                  Calculate
                </Button>
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
                multiple={false}
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
                multiple={false}
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
              <Label for="timediff">Total Hour(s)</Label>
            </FormGroup>
            <FormGroup>
              <Moment
                name="timediff"
                className="form-control"
                diff={item.starttime}
                unit="hours"
              >
                {item.endtime}
              </Moment>
            </FormGroup>

            <FormGroup>
              <Label for="bill">Bill</Label>
              <Input
                type="text"
                name="bill"
                id="bill"
                value={item.bill || ""}
                onChange={this.handleChange}
                autoComplete="bill"
              />
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
