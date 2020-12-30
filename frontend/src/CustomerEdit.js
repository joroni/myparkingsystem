import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./AppNavbar";
import SampleReactSelect from "./SampleReactSelect";
import Select from 'react-select';
import "moment-timezone";
import Moment from "react-moment";
//import NameForm from "./NameForm";

const sampleData = JSON.parse(localStorage.getItem("lotlisting"));

const spotData = JSON.parse(localStorage.getItem("spotlisting"))

console.log('spotData', spotData);
class CustomerEdit extends Component {
  emptyCustomer = {
    firstname: "",
    typeid: "",
    lotid: "",
    spotid: "",
    starttime: "",
    endtime: "",
    timediff: 0,
    bill:0,
  };
  state = {
    firstname: "",
    typeid: "",
    lotid: "",
    spotid: "",
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

  emptySpot = {
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
      spotid: this.emptySpot,
      typeid: this.emptyType,
      bill:'',
      active: false,
      selected: false,
    // Binding this keyword 
   
    };

    

    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this) ;
    this.toggle = this.toggle.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.customFilter = this.customFilter.bind(this);
   this.myFilterSpot = this.myFilterSpot.bind(this);
   this.onSelectChange = this.onSelectChange.bind(this);
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
      const spot = await (await fetch(`/api/spots`)).json();
      this.setState({
        item: customer,
        lotid: lot,
        spotid: spot,
        typeid: type
      });
      // this.handleRelease();
      localStorage.setItem("lotlisting", JSON.stringify(lot));
      localStorage.setItem("spotlisting", JSON.stringify(spot));
    }
    if (this.props.match.params.id === "new") {
      const lot = await (await fetch(`/api/lots`)).json();
      const type = await (await fetch(`/api/types`)).json();
      const spot = await (await fetch(`/api/spots`)).json();
      this.setState({
        lotid: lot,
        spotid: spot,
        typeid: type,
      });
      localStorage.setItem("lotlisting", JSON.stringify(lot));
      localStorage.setItem("spotlisting", JSON.stringify(spot));



    //  const filteredData = spot.filter(item => item.lotid === 1);
    //  console.log(filteredData);
    }
   // localStorage.setItem('filteredSpots', '');
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
    this.setState({
      timediff:event.target.value
    })
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



  // set selected value
  handleSelect(val) {
    this.setState({ selected: val });
    console.log(val)
    const filteredData = spotData.filter(item => item.lotid === val.id && item.state === 2);

    console.log(filteredData);
    this.setState({
      spotid:filteredData
    })
   // localStorage.setItem('filteredSpots', JSON.stringify(filteredData));
    //return filteredData;
  }


  selectMin(list){
        var min = Math.min.apply(Math, list.map(function (o) {
          return o.id;
      }));
    // eslint-disable-next-line array-callback-return
    list.filter(function(elem){
        if(elem.id === min){
          console.log(elem);
          return elem;}
        })
  }

 
  onSelectChange = () => {
    this.setState({
      selected: !this.state.selected
    });
  };
  myFilterSpot(searchTxt){

    const filteredData = spotData.filter(item => item.lotid === searchTxt);
    console.log(filteredData);

    /* 
    const myArray = JSON.parse(localStorage.getItem("spotlisting"))
    const filteredData = myArray.filter(item => item.lotid === searchTxt); */
    return filteredData;

  }
  //Add your search logic here.
  customFilter(spotList, searchText) {
    if (
      spotList.data.name.toLowerCase().includes(searchText.toLowerCase()) 
    ) {
      console.log("searchtext", searchText);
      const filteredData = spotData.filter(item => item.lotid === searchText.id);
    console.log('filteredData', filteredData);
      return true;
    } else {
      return false;
    }
  }

  
  
  render() {
    
    const { item, lotid, spotid, typeid } = this.state;
    const timeStart = (
      <Moment format="DD-MM-YYYY HH:mm" date={item.starttime} />
    );
   // const timediff = JSON.parse(localStorage.getItem("diff"));

  //  const timeEnd =  <Moment format="DD-MM-YYYY HH:mm" date={item.endtime}/>;
    //const timestayed = timeEnd.diff(timeStart, 'days');

    const title = <h2>{item.id ? "Edit Customer" : "Add Customer"}</h2>; //const timestayed = discharge.diff(admission, 'days');
   
//const fspot = this.myFilterSpot()
let spotRadio =  spotid.length > 0 &&
spotid.map((item, i) => {
  return (
   <div>
<label>
 {/*  <input type="radio" checked = {this.state.value === this.selectMin(spotid) }  key={i} value={item.spotid}
  onClick={this.onChange} /> */}
   <input type="radio" checked = {this.state.value === item.spotid }  key={i} value={item.spotid}
  onClick={this.onSelectChange} onChange={this.handleChange} />
   {item.name}
</label> </div>  
);
}, this);

    let spotButton =
    spotid.length > 0 &&
    spotid.map((item, i) => {
      return (
        <Button color="primary" type="button" key={i} value={item.spotid}>
                {item.name}
              </Button>
      );
    }, this);

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


    let spotList = 
    spotid.length > 0 &&
    spotid.map((item, i) => {
      return (
        <option key={i} value={item.id}>
          {item.name}
        </option>
      );
    }, this);

   // let result = spotList.filter(t=>t.name === 'A');
/* 
    let spotFilteredList = spotData.filter(function (spotData) {
      return spotData.faction === "";
    }); */
    
    
   
  
        

    const vehicleNo = (
      <div>
      {item.id ? (
      <FormGroup>
      <Label for="firstname">Vehicle No.</Label>
      <Input
        type="text"
        readOnly
        name="firstname"
        id="firstname"
        value={item.firstname || ""}
        onChange={this.handleChange}
        autoComplete="firstname"
      />
    </FormGroup>
     ) : (
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
    )}
  </div>
    );




    const loter =(
      <div>
      {item.id ? (
      <FormGroup>
      <Label for="lotid">Lot</Label>
      <select
        multiple={false}
        id="lotid"
        readOnly
        value={item.lotid}
        name="lotid"
        tabindex="-1"
        onChange={this.handleChange}
        className="form-control"
      >
        <option></option>
        {lotList}
      </select>
    </FormGroup>
    ) : (
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
    )}
  </div>
);




const loter2 =(
  <div>
    {item.id ? (
      <FormGroup>
      <Label for="lotid">Lot</Label>
      <Select
       readOnly
        className="react-selectcomponent"
        classNamePrefix="name-select"
        onChange={this.handleSelect}
        getOptionLabel={option =>
          `${option.name}`
        }
        getOptionValue={option => `${option}`}
        isOptionSelected={option => {
          // eslint-disable-next-line no-unused-expressions
          this.state.selected.id === option.id ? true : false;
        }}
        value={item.lotid || ""}
        options={sampleData}
        isSearchable={true}
        filterOption={this.customFilter}
        onInputChange={this.handleInputChange}
        noOptionsMessage={() => null}
        placeholder={'Enter Name'}
        autoFocus={true}
        menuIsOpen={this.state.menuOpen}
      />
      </FormGroup>
          ) : (
            <FormGroup>
            <Label for="lotid">Lot</Label>
            <Select
        className="react-selectcomponent"
        classNamePrefix="name-select"
        onChange={this.handleSelect}
        getOptionLabel={option =>
          `${option.name}`
        }
        value={item.lotid || ""}
        getOptionValue={option => `${option}`}
        isOptionSelected={option => {
          // eslint-disable-next-line no-unused-expressions
          this.state.selected.id === option.id ? true : false;
        }}
        options={sampleData}
        isSearchable={true}
        filterOption={this.customFilter}
        onInputChange={this.handleInputChange}
        noOptionsMessage={() => null}
        placeholder={'Enter Name'}
        autoFocus={true}
        menuIsOpen={this.state.menuOpen}
      />
      </FormGroup>
      )}
    </div>  
);

const spotNo = (
  <div>
  {item.id ? (
  <FormGroup>
  <Label for="spotid">Spot</Label>
  <select
    tabindex="-1"
    readOnly
    multiple={false}
    id="spotid"
    value={item.spotid}
    name="spotid"
    onChange={this.handleChange}
    className="form-control"
  >
    <option></option>
    {spotList}
  </select>
</FormGroup>
 ) : (
  <FormGroup>
  <Label for="spotid">Spot</Label>
  <select
    multiple={false}
    id="spotid"
    value={item.spotid}
    name="spotid"
    onChange={this.handleChange}
    className="form-control"
  >
   
    {spotList}
  </select>
</FormGroup>
)}
</div>
);


const typer =(
  <div>
  {item.id ? (
  <FormGroup>
  <Label for="typeid">Type</Label>
  <select
    multiple={false}
    id="typeid"
    readOnly
    value={item.typeid}
    name="typeid"
    tabindex="-1"
    onChange={this.handleChange}
    className="form-control"
  >
    <option></option>
    {typeList}
  </select>
</FormGroup>
) : (
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

    
 
    return (
      <div>
        <AppNavbar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <SampleReactSelect />
          <div className="row">
            <div className="col">
           {vehicleNo}
            </div>
            <div className="col">
            {loter2} {spotRadio}
            </div>
            <div className="col">
            {spotNo}
            </div>
            </div>

            <div className="row">
            <div className="col">
            {typer}
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
            <div className="row">
            <div className="col">   
          {biller}
          </div>
          </div>


     {/*      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-4">
              <span>Select Name</span>
              <Select
                className="react-selectcomponent"
                classNamePrefix="name-select"
                onChange={this.handleSelect}
                getOptionLabel={option =>
                  `${option.name}`
                }
                getOptionValue={option => `${option}`}
                isOptionSelected={option => {
                  // eslint-disable-next-line no-unused-expressions
                  this.state.selected.id === option.id ? true : false;
                }}
                options={sampleData}
                isSearchable={true}
                filterOption={this.customFilter}
                onInputChange={this.handleInputChange}
                noOptionsMessage={() => null}
                placeholder={'Enter Name'}
                autoFocus={true}
                menuIsOpen={this.state.menuOpen}
              />
            </div>
          </div>

          
        </div>
      </div>
{spotRadio} */}
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
