const mongoose = require('mongoose')
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected DB: ${mongoose.connection.host}`);
        console.log('===============================')
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB
