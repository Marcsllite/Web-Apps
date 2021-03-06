const mongoose = require('mongoose');

const { Schema } = mongoose;

const defaultRequiredDate = {
  type: Date,
  default: Date.now,
  require: true,
};

const requiredNumber = {
  type: Number,
  required: true,
};

const logEntrySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  comments: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  image: String,
  latitude: {
    requiredNumber,
    min: -90,
    max: 90,
  },
  longitude: {
    requiredNumber,
    min: -180,
    max: 180,
  },
  created_at: defaultRequiredDate,
  updated: requiredNumber,
  visitedDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

const logEntry = mongoose.model('logEntry', logEntrySchema);

module.exports = logEntry;
