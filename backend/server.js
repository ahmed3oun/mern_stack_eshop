const app = require('./app')
const connectDatabase= require('./config/database')
const dotenv = require('dotenv')
//setting up config file
dotenv.config({ path : 'backend/config/config.env'})

// Handle uncaught exceptions  
process.on('uncaughtException' , err => {
    console.error(`ERROR : ${err.stack}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1)
})

//Connecting to Database 
connectDatabase();

//Server 
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})
// Handle unhandled promise rejections 
process.on('unhandledRejection' , err => {
    console.error(`ERROR : ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise rejection`);
    server.close(()=>{
        process.exit(1);
    })
})