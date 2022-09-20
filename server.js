// DEPENDENCIES
const express = require("express");
const app = express();
const router = express.Router();
require("dotenv").config();
const mongoose = require("mongoose");
const gameController = require('./controllers/game.js');
const methodOverride = require("method-override")
const game = require('./models/game.js');


// DATABASE CONFIGURATION
mongoose.connect(process.env.DATABASE_URL)

// MIDDLEWARE  & BODY PARSER
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));
app.use('/games', gameController);
app.use('/games', game)

app.get('/', (req, res) => {
    res.render('index.ejs');
});

// Database Connection Error/Success
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

app.listen(3000, () => {
    console.log('listening....');
});