const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const path = require('path');

const authRoutes = require('./routes/tasks.js');
const { requireAuth } = require('./mdlwares/midlware.js');

const app = express();

app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: false
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname));

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(authRoutes);

app.get('/', requireAuth, (req, res) => {
  res.render('index', { user: req.session.user });
});

module.exports = app;