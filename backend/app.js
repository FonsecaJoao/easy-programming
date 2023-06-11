const express = require("express");
const app = express();



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
  
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    //res.json({msg: 'This is CORS-enabled for all origins!'})
  
    res.setHeader(
      "Acess-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });


module.exports = app;