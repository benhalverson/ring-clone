const mongoose = require('mongoose');

const { Schema } = mongoose;

const photoSchema = new Schema({
  createAt: { type: Date, default: Date.now },
  data: { data: Buffer, contentType: String },
  name: { type: String },
  faceId: { type: String },
  image: { type: String },
});

module.exports = mongoose.model('Photo', photoSchema);
