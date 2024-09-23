const { connectDB } = require('./config/db');
const { insertDemoData } = require('./demoData');
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const app = express();

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!SET TO FALSE NOT TO INSERT DEMO DATA AGAIN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const INSERT_DEMO_DATA = true;
// Connect to the database
connectDB().then(async () => {
  if (INSERT_DEMO_DATA) {
    await insertDemoData();
  }
});

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse request bodies and cookies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Set up method-override and flash middleware
app.use(methodOverride('_method'));
app.use(flash());

// Set up session middleware
app.use(session({
    secret: 'pika-pika',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
  }));

// Make flash messages available to all views
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});

// Serve static files from 'public' dir
app.use(express.static(path.join(__dirname, 'public')));

// Require all route files from the 'routes' folder
const routePath = path.join(__dirname, 'routes');
fs.readdirSync(routePath).forEach(file => {
  require(path.join(routePath, file))(app);
});

// Default route
app.get('/', (req, res) => {
  res.redirect('/main_page');
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
