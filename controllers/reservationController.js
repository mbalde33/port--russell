const Reservation = require('../models/Reservation');

// Récupérer toutes les réservations et les afficher
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.render('reservations', { reservations });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer une nouvelle réservation
exports.createReservation = async (req, res) => {
  const reservation = new Reservation({
    catwayNumber: req.body.catwayNumber,
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });

  try {
    await reservation.save();
    res.redirect('/reservations');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.redirect('/reservations');
  } catch (err) {
    res.status(500).send("Erreur lors de la suppression");
  }
};