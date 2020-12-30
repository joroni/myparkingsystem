const db = require('../config/db.config.js');
const Spot = db.Spot;

/**
 * Save a Spot object to database MySQL/PostgreSQL
 * @param {*} req 
 * @param {*} res 
 */
exports.createSpot = (req, res) => {
    let spot = {};

    try{
        // Building Spot object from upoading request's body
        spot.name = req.body.name;
        spot.lotid = req.body.lotid;
        spot.spotid = req.body.spotid;
        spot.state = req.body.state;
     
     
        // Save to MySQL database
        Spot.create(spot, 
                          {attributes:['id','lotid','spotid','name','state']})
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
 * Retrieve Spot information from database
 * @param {*} req 
 * @param {*} res 
 */
exports.spots = (req, res) => {
    // find all Spot information from 
    try{
        Spot.findAll({attributes:  ['id','lotid','spotid','name','state']})
        .then(spots => {
            res.status(200).json(spots);
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

exports.getSpot = (req, res) => {
    Spot.findByPk(req.params.id, 
                        {attributes: ['id','lotid','spotid','name','state']})
        .then(spot => {
          res.status(200).json(spot);
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
 * Updating a Spot
 * @param {*} req 
 * @param {*} res 
 */
exports.updateSpot = async (req, res) => {
    try{
        let spot = await Spot.findByPk(req.body.id);
    
        if(!spot){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a spot with id = " + spotId,
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                lotid: req.body.lotid,
                name: req.body.name,
                spotid: req.body.spotid,
                state: req.body.state
            }
            let result = await Spot.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes:  ['id','lotid','spotid','name','state']
                              }
                            );

            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a spot with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json(result);
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a spot with id = " + req.params.id,
            error: error.message
        });
    }
}

/**
 *  Delete a Spot by ID
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteSpot = async (req, res) => {
    try{
        let spotId = req.params.id;
        let spot = await Spot.findByPk(spotId);

        if(!spot){
            res.status(404).json({
                message: "Does Not exist a Spot with id = " + spotId,
                error: "404",
            });
        } else {
            await spot.destroy();
            res.status(200);
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a spot with id = " + req.params.id,
            error: error.message
        });
    }
}