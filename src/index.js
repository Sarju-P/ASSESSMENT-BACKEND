const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const startupDebugger = require('debug')('app:startup');
const appoinment = require('./api/routes/appoinment');


const app = express();
app.use(express.json());

app.use(cors());
// Helps to secure app by setting various HTTP headers
app.use(helmet());

// Database connection
mongoose.connect('mongodb://spandit:sarjupandit123@ds153980.mlab.com:53980/mydb')
    .then(() => { console.log('Database is connected...') })
    .catch(err => console.log('Failed to databse connection...'));

// Router for appointment
app.use('/api/appointment', appoinment);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan is enabled....');
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is running on ${port}`));