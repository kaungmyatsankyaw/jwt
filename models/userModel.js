const mongoose = require('mongoose');
const Bcrypt = require('bcryptjs');

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

userSchema.methods.comparePassword = function (plaintext, callback) {
    return callback(null, Bcrypt.compareSync(plaintext, this.password));
};

const User = mongoose.model('users', userSchema);

module.exports = User;