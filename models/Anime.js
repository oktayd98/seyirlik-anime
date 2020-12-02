const { Schema, model } = require('mongoose');

const animeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    synopsis: {
        type: String,
        required: true,
    },

    poster: {
        type: String,
        default:
            'https://i.pinimg.com/originals/e8/9a/41/e89a41a1f4021e81cafafec599233e34.png',
    },

    rate: {
        type: Number,
    },

    genres: [
        {
            type: Schema.Types.ObjectId,
            ref: 'genre',
        },
    ],

    episodes: {
        type: Number,
    },

    year: {
        type: Date,
    },

    mal: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model('anime', animeSchema);
