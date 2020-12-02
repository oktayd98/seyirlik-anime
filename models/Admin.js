const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            'Please a enter a valid email.',
        ],
    },
});

module.exports = model('admin', animeSchema);
