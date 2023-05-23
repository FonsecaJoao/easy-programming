const express = require("express");
const app = express();





app.use('/api/login' , (req, res, next)=>{
    const users = [
        {id: 'asasd2', 
        email: "asdas@asd.com", 
        password: 'asdsad'
    },
    {id: 'sadasda3', 
        email: "asdasdas@asdasdasd.com", 
        password: 'asdsad'}
    ];
    res.status(200).json({
        messsage: 'Users fetched succesfully!',
        users: users
    });
});

module.exports = app;