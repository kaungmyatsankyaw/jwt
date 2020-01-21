const app=require('./index');
const config=require('./config');
const port=config.port || 4000;

require('dotenv').config()

const mongoose = require('mongoose');


const mongoURI = "mongodb://localhost/movie";

mongoose.connect(mongoURI,{
    "useNewUrlParser": true,
    "useUnifiedTopology": true
})



app.listen(port,()=>{
    console.log('Server is running on port '+`${port}`);
});