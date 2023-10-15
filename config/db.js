const mongoose = require('mongoose')
require('dotenv').config()
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE)
        console.log('connected DB')
    }
    catch (err) {
        console.log(err)
        console.log('not connected DB')
    }
}
module.exports = connectDB