const Catway = require('../models/Catway');

// Récupérer tous les catways
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.render('catways', { catways });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un seul catway par son numéro
exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });

    if (!catway) {
      return res.status(404).json({ message: 'Catway non trouvé' });
    }

    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer un nouveau catway
exports.createCatway = async (req, res) => {
  const catway = new Catway({
    catwayNumber: req.body.catwayNumber,
    catwayType: req.body.catwayType,
    catwayState: req.body.catwayState
  });

  try {
    await catway.save();
    res.redirect('/catways');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Modifier un catway
exports.updateCatway = async (req, res) => {
  try {
    const catway = await Catway.findOneAndUpdate(
      { catwayNumber: req.params.id },
      {
        catwayType: req.body.catwayType,
        catwayState: req.body.catwayState
      },
      { new: true }
    );

    if (!catway) {
      return res.status(404).json({ message: 'Catway non trouvé' });
    }

    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un catway
exports.deleteCatway = async (req, res) => {
  try {
    await Catway.findByIdAndDelete(req.params.id);
    res.redirect('/catways');
  } catch (err) {
    res.status(500).send("Erreur lors de la suppression du catway");
  }
};