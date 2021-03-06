let express = require('express');
let router = express.Router();
 
const customers = require('../controllers/controller.js');
const lots = require('../controllers/lot.js');

router.post('/api/customer', customers.createCustomer);
router.get('/api/customer/:id', customers.getCustomer);
router.get('/api/customers', customers.customers);
router.put('/api/customer', customers.updateCustomer);
router.delete('/api/customer/:id', customers.deleteCustomer);



router.post('/api/lot', lots.createLot);
router.get('/api/lot/:id', lots.getLot);
router.get('/api/lots', lots.lots);
router.put('/api/lot', lots.updateLot);
router.delete('/api/lot/:id', lots.deleteLot);

module.exports = router;