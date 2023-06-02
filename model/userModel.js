const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: "String",
        required: [true, "Please enter a username"]
    },
    email: {
        type: "String",
        required: [true, "Please enter a email address"],
        unique: [true, "Email address already taken"]
    },
    password: {
        type: "String",
        required: [true, "Please enter a password"]
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);