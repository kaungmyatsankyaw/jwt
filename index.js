const express = require('express')
const bodyParser = require('body-parser')

let morgan= require('morgan');

const app = express();

let userRoute= require('./route/user');
let authRoute= require('./route/auth');

app.use(bodyParser.json())
app.use(morgan('dev'))


app.use('/api', userRoute);
app.use('/auth',authRoute);

module.exports=app;