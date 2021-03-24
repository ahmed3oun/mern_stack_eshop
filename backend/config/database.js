const mongoose = require('mongoose')

const connectDatabase = ()=>{
mongoose.connect(process.env.CONNECTION_STRING ,
    { useNewUrlParser: true,useUnifiedTopology: true ,dbName:'eshop-database'}
).then((con)=>{
    console.log(`Database is connected succesfully  with host : ${con.connection.host} !!!`);
}).catch((err)=>{
    console.log(err);
})
}

module.exports = connectDatabase ;