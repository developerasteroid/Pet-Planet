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
      if(process.env.ADMIN_EMAIL != decodedToken.email){
        return res.status(401).send({
            message: "Auth failed",
            success: false,
          });
      }
      if(decodedToken.type != "admin"){
        return res.status(401).send({
            message:'Auth Failed. Not a valid seller.',
            success: false,
          });
      }
      next();
    } catch (error) {
      res.status(401).send({
        message: "Auth failed",
        success: false,
      });
    }
  };
  