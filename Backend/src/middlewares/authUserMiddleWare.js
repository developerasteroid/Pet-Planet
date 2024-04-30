const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).send({
          message: "Auth failed",
          success: false,
        });
      }
      const decodedToken = jwt.verify(token, process.env.jwt_secret);
      if(!mongoose.Types.ObjectId.isValid(decodedToken._id)){
        return res.status(401).send({
          message:'Invalid ID',
          success: false,
        });
      }
      if(decodedToken.type != "user"){
        return res.status(401).send({
            message:'Auth Failed. Not a valid user.',
            success: false,
          });
      }
      req.params._id = decodedToken._id;
      next();
    } catch (error) {
      res.status(401).send({
        message: "Auth failed",
        success: false,
      });
    }
  };
  