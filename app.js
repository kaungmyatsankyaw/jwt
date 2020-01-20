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

// mongoose.set('debug',true)

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message || "Something went wrong. Please try again",
      status: err.status || 500
    });
  });


app.listen(port,()=>{
    console.log('Server is running on port '+`${port}`);
});