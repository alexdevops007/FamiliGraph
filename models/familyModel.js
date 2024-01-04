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
  // Autres champs spécifiques à la famille
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
  // Ajoutez d'autres champs au besoin
  events: [
    {
      eventName: String,
      eventDate: Date,
      // Ajoutez d'autres champs au besoin
    },
  ],
  birthPlace: String,
  occupation: String,
  contactInformation: {
    email: String,
    phone: String,
    // Ajoutez d'autres champs au besoin
  },
  // Ajoutez d'autres champs au besoin
});

const Family = mongoose.model('Family', familySchema);

module.exports = Family;
