const mongoose = require("mongoose");
const { model } = require("./Anime");
const { Schema } = mongoose;

const genreSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("genre", genreSchema);
