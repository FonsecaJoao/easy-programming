const http = require('http');
const debug = require("debug")("node-angular");
const app = require('./backend/app');

const mysql = require("mysql");
const bodyparser = require("body-parser");
//const cors = require("cors");

app.use(bodyparser.json());


const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tesp2018#',
    database: 'easy_programming'
});

mysqlConnection.connect((err)=> {
    if(!err)
    console.log('Connection Established Successfully');
    else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    });

const port2 = process.env.PORT || 8080;
app.listen(port2, () => console.log(`Listening on port ${port2}..`));
    


    
const normalizePort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port)){
        return val;
    }

    if (port => 0){
        return port;
    }
    return false;
};

const onError = error =>{
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof addr === "string" ? "pipe" + addr : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + "requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default: 
            throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe" + addr : "port "+ port;
    debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set('port', port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
