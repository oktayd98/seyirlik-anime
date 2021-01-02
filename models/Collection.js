const { Schema, model } = require('mongoose');

const collectionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  animes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'anime',
    },
  ],
});

module.exports = model('collection', collectionSchema);
