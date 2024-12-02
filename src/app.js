const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { obtenerUsuariosAPI } = require('./controllers/users'); //--

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(require("./services/login"));
app.use(require('./services/admin')); // --


module.exports = app;