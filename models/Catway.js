const mongoose = require('mongoose');

// On définit le schéma (la structure) d'un Catway
const catwaySchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: true,
    unique: true // Chaque numéro de place est unique
  },
  catwayType: {
    type: String,
    enum: ['long', 'short'], // On n'accepte que ces deux valeurs
    required: true
  },
  catwayState: {
    type: String,
    required: true
  }
});

// On exporte le modèle pour l'utiliser ailleurs
module.exports = mongoose.model('Catway', catwaySchema);
