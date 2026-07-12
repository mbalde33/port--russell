const User = require('../models/User.js');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
    res.render('login', { error: null });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log('📩 Tentative de connexion pour :', email);

    try {
        const user = await User.findOne({ email: email });
        
        if (!user) {
            console.log('❌ Utilisateur NON trouvé dans la base Atlas');
            return res.render('login', { error: "Utilisateur non trouvé." });
        }

        console.log('✅ Utilisateur trouvé, vérification du mot de passe...');
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Mots de passe correspondent ?', isMatch);

        if (!isMatch) {
            console.log('❌ Mot de passe incorrect');
            return res.render('login', { error: "Mot de passe incorrect." });
        }

        req.session.user = { id: user._id, name: user.name, email: user.email };
        console.log('🚀 CONNEXION RÉUSSIE ! Redirection...');
        res.redirect('/dashboard');

    } catch (err) {
        console.error("🔥 Erreur CRITIQUE :", err);
        res.render('login', { error: "Une erreur est survenue." });
    }
};
