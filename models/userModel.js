const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    address: {
        type: Array,
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
    },
    userType: {
        type: String,
        default: 'client',
        enum: ['client','admin','driver','vendor'],
    },
    profile: {
        type: String,
        default: 'https://icons8.com/icons/set/default-profile',
    }
},{ timestamps: true });
module.exports = mongoose.model('user', userSchema);

