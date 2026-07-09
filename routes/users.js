const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Liste tous les utilisateurs du système
 *     tags: [Utilisateurs]
 *     responses:
 *       200:
 *         description: Succès
 *   post:
 *     summary: Créer un nouvel utilisateur (Administrateur)
 *     tags: [Utilisateurs]
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 */

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/delete/:id', userController.deleteUser);

module.exports = router;