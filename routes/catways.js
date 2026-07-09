const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Catway:
 *       type: object
 *       required:
 *         - catwayNumber
 *         - type
 *         - catwayState
 *       properties:
 *         catwayNumber:
 *           type: number
 *           description: Numéro unique de l'emplacement
 *         type:
 *           type: string
 *           description: Type de catway (Long ou Court)
 *         catwayState:
 *           type: string
 *           description: État actuel du catway
 * 
 * /catways:
 *   get:
 *     summary: Récupère la liste de tous les catways
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: Succès
 *   post:
 *     summary: Ajouter un nouveau catway
 *     tags: [Catways]
 *     responses:
 *       201:
 *         description: Catway créé
 */

// Route pour l'affichage (Vue)
router.get('/', catwayController.getAllCatways);

// Route pour la création (Action)
router.post('/', catwayController.createCatway);

router.get('/delete/:id', catwayController.deleteCatway);

module.exports = router;