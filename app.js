const express = require('express');
const session = require('express-session');
const authRoutes = require('./src/routes/tasks.js');
const { requireAuth } = require('./src/mdlwares/midlware.js');

const app = express();

// настройка парсинга 
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your-very-secure-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // выставить true, если используется https
}));

app.use(authRoutes);

app.get('/', requireAuth, (req, res) => {
  res.render('index', { user: req.session.user });
});
