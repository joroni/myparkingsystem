const express = require('express');
const app = express();

var bodyParser = require('body-parser');
 
global.__basedir = __dirname;
 
const db = require('./app/config/db.config.js');

const Customer = db.Customer;
const Lot = db.Lot;
const Type = db.Type;
const Spot = db.Spot;

let router = require('./app/routers/router.js');

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static('resources'));
app.use('/', router);

// Create a Server
const server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  Customer.sync().then(() => {
    const customers = [
      { firstname: 'SED1111', typeid: 1, 
                lotid: 1, endtime: ''},
      { firstname: 'SUV1111', typeid: 2, 
                lotid: 2, endtime: ''},
      { firstname: 'VAN111', typeid: 3, 
                lotid: 3, endtime: ''},
    ]
    
    for(let i=0; i<customers.length; i++){
      Customer.create(customers[i]);
    }

  })

  Lot.sync().then(() => {
    const lots = [
      {id:1, name: 'A', slots: 10, isactive: 1},
      {id:2, name: 'B', slots: 10, isactive: 1},
      {id:3, name: 'C', slots: 10,  isactive: 1}
    ]
    
    for(let j=0; j<lots.length; j++){
      Lot.create(lots[j]);
    }
  })


  Type.sync().then(() => {
    const types = [
      {id:1, name: 'SP'},
      {id:2, name: 'MP'},
      {id:3, name: 'LP'}
    ]
    
    for(let k=0; k<types.length; k++){
      Type.create(types[k]);
    }
  })


  
  Spot.sync().then(() => {
    const spots = [
      {id:1, name: 'A1', spotid:1, state:0},
      {id:2, name: 'A2', spotid:2, state:0},
      {id:3, name: 'A3', spotid:3, state:0},
    ]
    
    for(let l=0; l<spots.length; l++){
      Spot.create(spots[l]);
    }
  })
}); 