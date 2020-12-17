const express = require('express');
const app = express();

var bodyParser = require('body-parser');
 
global.__basedir = __dirname;
 
const db = require('./app/config/db.config.js');

const Customer = db.Customer;
const Lot = db.Lot;
const Type = db.Type;

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
      { firstname: 'Jack', typeid: 1, 
                lotid: 1, address: '374 William S Canning Blvd'},
      { firstname: 'Adam', typeid: 2, 
                lotid: 2, address: 'Fall River MA 2721. 121 Worcester Rd'},
      { firstname: 'Dana', typeid: 3, 
                lotid: 3, address: 'Framingham MA 1701. 677 Timpany Blvd'},
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
}); 