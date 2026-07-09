const User = require('../models/user.js');

// Fonction pour afficher la liste des utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    // On demande d'afficher la page views/users.ejs et on lui donne la liste des users
    res.render('users', { users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fonction pour créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  try {
    await user.save();
    res.redirect('/users'); // Une fois créé, on recharge la page de la liste
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
  } catch (err) {
    res.status(500).send("Erreur lors de la suppression de l'utilisateur");
  }
};