const db = require('../config/db.config.js');
const Type = db.Type;

/**
 * Save a Type object to database MySQL/PostgreSQL
 * @param {*} req 
 * @param {*} res 
 */
exports.createType = (req, res) => {
    let type = {};

    try{
        // Building Type object from upoading request's body
        type.name = req.body.name;
    
     
        // Save to MySQL database
        Type.create(type, 
                          {attributes: ['id', 'name']})
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
 * Retrieve Type information from database
 * @param {*} req 
 * @param {*} res 
 */
exports.types = (req, res) => {
    // find all Type information from 
    try{
        Type.findAll({attributes: ['id','name']})
        .then(types => {
            res.status(200).json(types);
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

exports.getType = (req, res) => {
    Type.findByPk(req.params.id, 
                        {attributes: ['id','name']})
        .then(type => {
          res.status(200).json(type);
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
 * Updating a Type
 * @param {*} req 
 * @param {*} res 
 */
exports.updateType = async (req, res) => {
    try{
        let type = await Type.findByPk(req.body.id);
    
        if(!type){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a type with id = " + typeId,
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                name: req.body.name,
                slots: req.body.slots,
                isactive: req.body.isactive
            }
            let result = await Type.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id','name']
                              }
                            );

            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a type with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json(result);
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a type with id = " + req.params.id,
            error: error.message
        });
    }
}

/**
 *  Delete a Type by ID
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteType = async (req, res) => {
    try{
        let typeId = req.params.id;
        let type = await Type.findByPk(typeId);

        if(!type){
            res.status(404).json({
                message: "Does Not exist a Type with id = " + typeId,
                error: "404",
            });
        } else {
            await type.destroy();
            res.status(200);
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a type with id = " + req.params.id,
            error: error.message
        });
    }
}