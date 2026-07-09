const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Liste toutes les réservations
 *     tags: [Réservations]
 *     responses:
 *       200:
 *         description: Succès
 *   post:
 *     summary: Créer une nouvelle réservation
 *     tags: [Réservations]
 *     responses:
 *       201:
 *         description: Réservation créée
 */

router.get('/', reservationController.getAllReservations);
router.post('/', reservationController.createReservation);
router.get('/delete/:id', reservationController.deleteReservation);

module.exports = router;