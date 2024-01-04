const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  deathDate: {
    type: Date,
  },
  isAlive: {
    type: Boolean,
    default: true,
  },
  father: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Family',
  },
  mother: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Family',
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Family',
    },
  ],
  events: [
    {
      eventName: String,
      eventDate: Date,
    },
  ],
  birthPlace: String,
  occupation: String,
  contactInformation: {
    email: String,
    phone: String,
  },
});

const Family = mongoose.model('Family', familySchema);

module.exports = Family;
