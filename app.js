const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const Reservation = require('./models/Reservation');
require('dotenv').config();

const app = express();
const port = 3000;

// --- CONFIGURATION DES PAGES (EJS) ---
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

// --- LECTURE DES DONNÉES ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- SESSIONS ---
app.use(session({
  secret: process.env.SESSION_SECRET || 'port-russell-secret',
  resave: false,
  saveUninitialized: false
}));

// --- CONNEXION À LA BASE DE DONNÉES ---
mongoose.connect("mongodb+srv://admin:1234@cluster0.xerrxi6.mongodb.net/port-russell?retryWrites=true&w=majority", {
serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log('✅ BRAVO : Tu es connecté à MongoDB !');
})
.catch((err) => {
  console.log('❌ ERREUR : La connexion a échoué.');
  console.log('Détail :', err.message);
});

// --- CONFIGURATION SWAGGER ---
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Port Russell',
      version: '1.0.0',
      description: 'Documentation de l\'API pour la gestion du port de Russell',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- ROUTES ---
const catwaysRoute = require('./routes/catways');
app.use('/catways', catwaysRoute);

const catwayDetailsRoute = require('./routes/catwayDetails');
app.use('/catways', catwayDetailsRoute);

const reservationsRoute = require('./routes/reservations');
app.use('/reservations', reservationsRoute);

const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

const authController = require('./controllers/authController');
app.get('/login', authController.getLogin);
app.post('/login', authController.postLogin);

// Route Déconnexion
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Route Dashboard
app.get('/dashboard', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  try {
    const reservations = await Reservation.find().limit(5);
    res.render('dashboard', {
      user: req.session.user,
      reservations: reservations
    });
  } catch (err) {
    res.render('dashboard', { user: req.session.user, reservations: [] });
  }
});

// Route accueil → redirige vers login
app.get('/', (req, res) => {
  res.redirect('/login');
});

// --- LANCEMENT ---
app.listen(port, () => {
  console.log(`Le serveur est lancé sur http://localhost:${port}`);
});
