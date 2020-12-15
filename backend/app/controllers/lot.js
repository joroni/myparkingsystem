const db = require('../config/db.config.js');
const Lot = db.Lot;

/**
 * Save a Lot object to database MySQL/PostgreSQL
 * @param {*} req 
 * @param {*} res 
 */
exports.createLot = (req, res) => {
    let lot = {};

    try{
        // Building Lot object from upoading request's body
        lot.name = req.body.name;
        lot.isactive = req.body.isactive;
     
        // Save to MySQL database
        Lot.create(lot, 
                          {attributes: ['id', 'name', 'isactive']})
                    .then(result => {    
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

/**
 * Retrieve Lot information from database
 * @param {*} req 
 * @param {*} res 
 */
exports.lots = (req, res) => {
    // find all Lot information from 
    try{
        Lot.findAll({attributes: ['id', 'name', 'isactive']})
        .then(lots => {
            res.status(200).json(lots);
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
}

exports.getLot = (req, res) => {
    Lot.findByPk(req.params.id, 
                        {attributes: ['id', 'name', 'isactive']})
        .then(lot => {
          res.status(200).json(lot);
        }).catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        })
}

/**
 * Updating a Lot
 * @param {*} req 
 * @param {*} res 
 */
exports.updateLot = async (req, res) => {
    try{
        let lot = await Lot.findByPk(req.body.id);
    
        if(!lot){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a lot with id = " + lotId,
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                name: req.body.name,
                isactive: req.body.isactive
            }
            let result = await Lot.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'name', 'isactive']
                              }
                            );

            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a lot with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json(result);
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a lot with id = " + req.params.id,
            error: error.message
        });
    }
}

/**
 *  Delete a Lot by ID
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteLot = async (req, res) => {
    try{
        let lotId = req.params.id;
        let lot = await Lot.findByPk(lotId);

        if(!lot){
            res.status(404).json({
                message: "Does Not exist a Lot with id = " + lotId,
                error: "404",
            });
        } else {
            await lot.destroy();
            res.status(200);
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a lot with id = " + req.params.id,
            error: error.message
        });
    }
}