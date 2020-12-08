const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const adminSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        select: false,
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please a enter a valid email.'],
    },
});

adminSchema.pre('password', function (next) {
    if (!this.isModified()) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            return next();
        });
    });
});

adminSchema.methods.generateToken = () => {
    const payload = {
        id: this._id,
        name: this.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
    return token;
};

module.exports = model('admin', adminSchema);
