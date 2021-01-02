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
  poster: {
    type: String,
    default:
      'https://i.pinimg.com/originals/e8/9a/41/e89a41a1f4021e81cafafec599233e34.png',
  },
});

module.exports = model('collection', collectionSchema);
