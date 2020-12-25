import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./AppNavbar";

import "moment-timezone";
import Moment from "react-moment";
//import NameForm from "./NameForm";
class CustomerEdit extends Component {
  emptyCustomer = {
    firstname: "",
    typeid: "",
    lotid: [],
    starttime: "",
    endtime: "",
    timediff: 0,
    bill:0,
  };
  state = {
    firstname: "",
    typeid: "",
    lotid: [],
    starttime: "",
    endtime: "",
    timediff: "",
    bill:"",
  }
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
   // let bill = JSON.parse(localStorage.getItem("bill"));
    this.state = {
      item: this.state,
      lotid: this.emptyLot,
      typeid: this.emptyType,
      bill:'',
      active: false
    // Binding this keyword 
   
    };

    

    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this) 
    this.toggle = this.toggle.bind(this) 
  //  this.getTimeDiff = this.getTimeDiff.bind(this);
  }
  toggle(event){
    event.preventDefault();
    this.setState({active: !this.state.active});
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
 
    let item = { ...this.state.item };
    item[name] = value;
    let lot = { ...this.state.lot };
    let type = { ...this.state.type };
    this.setState({ item, lot, type});
 
    console.log([event.target.value]);
    console.log(item)
   // this.handleChange();
 }



    handleClick(e){ 
      e.preventDefault();
      // Changing state 
      this.setState({bill : JSON.parse(window.localStorage.getItem("bill"))}) 
    } 

  onClick = (e) => {
    e.preventDefault();
    this.setState({
        bill:JSON.parse(window.localStorage.getItem("bill"))
    })

    const getValue = (key, defaultValue = {}) => {
        try {
          // read value from local storage
          const item = window.localStorage.getItem(key);
          return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
          console.log(error);
          return defaultValue;
        }
      }
      
      const setValue = (key, value) => {
        try {
          window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
          console.log(error);
        }
      }
      
      setValue("bill", {bill: JSON.parse(window.localStorage.getItem("bill"))})
      console.log(getValue("bill"))
}

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const customer = await (
        await fetch(`/api/customer/${this.props.match.params.id}`)
      ).json();
      const lot = await (await fetch(`/api/lots`)).json();
      const type = await (await fetch(`/api/types`)).json();
     // const bill = localStorage.getItem("bill");
    //  const endtime = this.endtime;
      //const starttime = this.starttime;
      //const timediff = this.timediff;
      //const bill = this.bill;
      this.setState({
        item: customer,
        lotid: lot,
        typeid: type
      });
      // this.handleRelease();
      
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
    let type = { ...this.state.type };
    this.setState({ item, lot, type});
  
    console.log([event.target.value]);
    console.log(item)
    
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



getTimeDiff(dates1,dates2) {
  const date1s = new Date(dates1);
  const date2s = new Date(dates2);
  const diffInMs = Math.abs(date2s - date1s);
 // const diff =  diffInMs / (1000 * 60 * 60);
  return Math.round(diffInMs / (1000 * 60 * 60));
 /*  if(diff <= 3){
    return 5;
  } else {
    return Math.round(diffInMs / (1000 * 60 * 60) - 3);
  } */
  
}


getBill(typeId, dates1, dates2){
  const date1s = new Date(dates1);
  const date2s = new Date(dates2);
  const parkedTime = this.getTimeDiff(date1s,date2s);
  let price = 0;
  let typeid =typeId;
  let penalty = 0;
  let bill = 0;

  if (parkedTime <= 3) {
    // eslint-disable-next-line no-const-assign
    price = 40;
    // eslint-disable-next-line no-const-assign
    bill = price;
    console.log("Bill", bill);
    localStorage.setItem("bill", JSON.stringify(bill));
     return bill;
  }

  if (typeid === 1 && parkedTime > 3) {
    // eslint-disable-next-line no-const-assign
    price = 40;
    // eslint-disable-next-line no-const-assign
    penalty = 40;
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line no-const-assign
    bill = price + (penalty * (parkedTime));
    // eslint-disable-next-line no-const-assign
    console.log("Type", typeid);
    console.log("Price", price);
    console.log("Parked OT", parkedTime);
    console.log("Penalty", penalty);
    console.log("Bill", bill);
    localStorage.setItem("bill", JSON.stringify(bill));
     return bill;
  }

  if (typeid === 2 && parkedTime) {
    // eslint-disable-next-line no-const-assign
    price = 40;
    // eslint-disable-next-line no-const-assign
    penalty = 60;
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line no-const-assign
    bill = price + (penalty * (parkedTime))
    // eslint-disable-next-line no-const-assign
    
    console.log("Type", typeid);
    console.log("Price", price);
    console.log("Parked OT", parkedTime);
    console.log("Penalty", penalty);
    console.log("Bill", bill);
   localStorage.setItem("bill", JSON.stringify(bill));
     return bill;
  }
  

  if (typeid === 3 && parkedTime > 3) {
    // eslint-disable-next-line no-const-assign
    price = 40;
    // eslint-disable-next-line no-const-assign
    penalty = 100;
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line no-const-assign
    bill = price + (penalty * (parkedTime))
    // eslint-disable-next-line no-const-assign
    
    console.log("Type", typeid);
    console.log("Price", price);
    console.log("Parked OT", parkedTime);
    console.log("Penalty", penalty);
    console.log("Bill", bill);
    localStorage.setItem("bill", JSON.stringify(bill));
     return bill;
  }
  

  if (parkedTime >= 24) {
    // eslint-disable-next-line no-const-assign
    price = 0;
    // eslint-disable-next-line no-const-assign
    penalty = 5000;
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line no-const-assign
    bill = price + (penalty * (parkedTime))
    // eslint-disable-next-line no-const-assign
    
    console.log("Type", typeid);
    console.log("Price", price);
    console.log("Parked OT", parkedTime);
    console.log("Penalty", penalty);
    console.log("Bill", bill);
    localStorage.setItem("bill", JSON.stringify(bill));
     return bill;
  }
}

  render() {
    
    const { item, lotid, typeid } = this.state;
    const timeStart = (
      <Moment format="DD-MM-YYYY HH:mm" date={item.starttime} />
    );
   // const timediff = JSON.parse(localStorage.getItem("diff"));

  //  const timeEnd =  <Moment format="DD-MM-YYYY HH:mm" date={item.endtime}/>;
    //const timestayed = timeEnd.diff(timeStart, 'days');

    const title = <h2>{item.id ? "Edit Customer" : "Add Customer"}</h2>; //const timestayed = discharge.diff(admission, 'days');
   

    const biller2 = ( <div> 
      
        {item.id ? (
           <FormGroup>
      <Input
                      type="text"
                      name="bill"
                      id="bill"
                      value={item.bill ||this.state.bill }
                      onChange={this.handleClick}
                      autoComplete="bill"
                    />
              
              <button onBlur={this.handleChange} onClick={this.handleClick}> 
                Click here! 
              </button> 
              </FormGroup>
        ) : (
          ""
        )}
      </div>
    );
  
        
    const biller = (
      <div>
        {item.id ? (
          <FormGroup>
            <Label for="bill">Bill</Label>
            <Input
              type="text"
              name="bill"
              id="bill"
              placeholder=""
              value={
                item.bill || this.getBill(item.typeid, item.starttime, item.endtime)
              }
             readOnly
            //  onClick={this.handleChange}
              onChange={this.handleChange}
              autoComplete="bill"
              className={ 
                this.state.active ? "active" : "" 
              }
              onClick={event => this.toggle(event)}
            />


          {/*   <NameForm/> */}
          </FormGroup>
        ) : (
          ""
        )}
      </div>
    );
    const timediffer = (
      <div>
        {item.id ? (
      <FormGroup>
      <Label for="timediff">Over Time</Label>
      <Input
        type="text"
        name="timediff"
        id="timediff"
        placeholder=""
        readOnly
        value={item.timediff||this.getTimeDiff(item.starttime, item.endtime)||""}
       // onChange={this.handleChange}
      //  onClick={this.handleChange}
        onChange={this.handleChange}
      
        className={ 
          this.state.active ? "active" : "" 
        }
        onClick={event => this.toggle(event)}
        autoComplete="timediff"
      />
    </FormGroup>
    ) : (
      ""
    )}
  </div>
);
     const timer = (
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
                <Input
                  className="form-control"
                  type="datetime-local"
                  name="endtime"
                  id="endtime"
                  value={
                    item.endtime || ""
                  }
                  onChange={this.handleChange}
                
                  autoComplete="endtime"
                />
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
          <div className="row">
            <div className="col">
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
            </div>
            <div className="col">
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
            </div>
            <div className="col">
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
            </div>
            </div>
            <div className="row">
            <div className="col">
            {timer}
            </div>
            <div className="col">
            {endtimer}
            </div>
           
           <div className="col">
            {timediffer}
            </div>
            </div>
          {biller}
       {/*   {biller2} */}
            <FormGroup>
        
          {/*  <Button  color="danger" onClick={this.handleChange} >Calculate</Button>  */}
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
