const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql2');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

dotenv.config();

app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())


// CORS middleware
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

var connection = require("./db");

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected DB: ${process.env.MYSQL_DATABASE}`);
});

// routes
app.use('/', require('./routes/item'));
app.use('/user', require('./routes/user').router);

// Server listening
app.listen(process.env.PORT, function () {
    console.log(`Server listening on port: ${process.env.PORT}`);
})
