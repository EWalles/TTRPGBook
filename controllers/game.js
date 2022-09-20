// Dependencies 
const express = require('express');
const app = express.Router();
const game = require('../models/game');
require('dotenv').config();
const mongoose = require("mongoose");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: false })); // gives access to req.body
app.use(methodOverride('_method')); // allows us to use methods other than get and post

//Index
app.get('/', (req, res) => {
    game.find({}, (error, allgame) => {
        res.render('games/index.ejs', {
            game: allgame,
        });
    });
});

// New
app.get('/new', (req, res) => {
	res.render('games/new.ejs');
});

// Delete
app.delete('/:id', (req, res) => {
    game.findByIdAndDelete(req.params.id, () => {
        res.redirect('/games')
    });
});

// Update
app.put('/:id', (req, res) => {

    game.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (error, updatedgame) => {
        res.redirect(`/games`);
    });
});

// Create
app.post('/', (req, res) => {


    game.create(req.body, (error, createdgame) => {
        res.redirect('/games');
    });
});

// Edit 
app.get('/:id/edit', (req, res) => {
    game.findById(req.params.id, (error, game) => {
        res.render('games/edit.ejs', {
            game: game
        });
    });
});

// Show
app.get("/:id", function (req, res){
    game.findById(req.params.id, function (err, foundGame){
        res.render("games/show.ejs", {
            game: foundGame,
        })
    })
})


// Exports 
module.exports = app;