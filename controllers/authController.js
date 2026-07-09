const User = require('../models/User.js');
const bcrypt = require('bcrypt');

// Afficher la page de login
exports.getLogin = (req, res) => {
    res.render('login', { error: null });
};

// Gérer la connexion
exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Chercher l'utilisateur par son email
        const user = await User.findOne({ email });

        if (!user) {
            return res.render('login', { error: "Utilisateur non trouvé." });
        }

        // 2. Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.render('login', { error: "Mot de passe incorrect." });
        }

        // 3. IMPORTANT : Enregistrer l'utilisateur dans la SESSION
        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        // 4. Rediriger vers le dashboard
        res.redirect('/dashboard');

    } catch (err) {
        console.error(err);
        res.render('login', { error: "Une erreur est survenue." });
    }
};
