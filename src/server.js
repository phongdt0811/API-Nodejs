require('dotenv').config({path: ('.env')});
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.SERVER_PORT;
//add new router
const db = require('./config/database'); 

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/html')); 

//add new route
app.listen(port, console.log(`server started on port ${port}`));

global.app = app;
global.db = db;

require('./app');