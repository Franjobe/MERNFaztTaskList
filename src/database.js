// conexion a la BD

const mongoose = require("mongoose");

const URI = "mongodb://localhost/mern-tasks" 

//"mongodb://franjo:fran3154@ds121203.mlab.com:21203/testing" 

mongoose.connect(URI)
.then(db => console.log("DB is connected"))
.catch(err =>console.log(err));


module.exports = mongoose;