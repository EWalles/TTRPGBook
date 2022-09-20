
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const gameSchema = new Schema({
	title: String,
	author: String,
	publisher: String,
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;