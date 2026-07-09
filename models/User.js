const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Méthode corrigée pour crypter le mot de passe avant l'enregistrement
userSchema.pre('save', async function() {
  // Si le mot de passe n'a pas été modifié, on ne fait rien
  if (!this.isModified('password')) return;

  // On crypte le mot de passe
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', userSchema);
