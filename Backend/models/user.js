const mongoose = require('mongoose');

//defining the schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    }
});

//creating a login model
const User = mongoose.model('User', userSchema);
module.exports = User;
